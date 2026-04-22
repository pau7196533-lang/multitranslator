$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$publicRoot = Join-Path $projectRoot "public"
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, 3000)

function Get-ContentType {
  param([string]$Path)

  switch ([System.IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    ".html" { "text/html; charset=utf-8" }
    ".js" { "application/javascript; charset=utf-8" }
    ".css" { "text/css; charset=utf-8" }
    ".json" { "application/json; charset=utf-8" }
    ".svg" { "image/svg+xml" }
    ".png" { "image/png" }
    ".jpg" { "image/jpeg" }
    ".jpeg" { "image/jpeg" }
    ".ico" { "image/x-icon" }
    ".webp" { "image/webp" }
    default { "application/octet-stream" }
  }
}

function Resolve-StaticPath {
  param([string]$UrlPath)

  $candidate = if ([string]::IsNullOrWhiteSpace($UrlPath) -or $UrlPath -eq "/") {
    "index.html"
  } else {
    $UrlPath.TrimStart("/") -replace "/", "\"
  }

  $resolved = Join-Path $publicRoot $candidate
  if (Test-Path $resolved -PathType Leaf) {
    return $resolved
  }

  if (-not [System.IO.Path]::HasExtension($candidate)) {
    $spaFallback = Join-Path $publicRoot "index.html"
    if (Test-Path $spaFallback -PathType Leaf) {
      return $spaFallback
    }
  }

  return $null
}

function Send-Response {
  param(
    [Parameter(Mandatory = $true)] [System.IO.Stream]$Stream,
    [int]$StatusCode = 200,
    [string]$StatusText = "OK",
    [string]$ContentType = "text/plain; charset=utf-8",
    [byte[]]$Body = @()
  )

  $headers = @(
    "HTTP/1.1 $StatusCode $StatusText",
    "Content-Type: $ContentType",
    "Content-Length: $($Body.Length)",
    "Connection: close",
    ""
  ) -join "`r`n"

  $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($headers + "`r`n")
  $Stream.Write($headerBytes, 0, $headerBytes.Length)
  if ($Body.Length -gt 0) {
    $Stream.Write($Body, 0, $Body.Length)
  }
  $Stream.Flush()
}

function Send-JsonResponse {
  param(
    [Parameter(Mandatory = $true)] [System.IO.Stream]$Stream,
    [Parameter(Mandatory = $true)] $Data,
    [int]$StatusCode = 200,
    [string]$StatusText = "OK"
  )

  $body = [System.Text.Encoding]::UTF8.GetBytes(($Data | ConvertTo-Json -Depth 5))
  Send-Response -Stream $Stream -StatusCode $StatusCode -StatusText $StatusText -ContentType "application/json; charset=utf-8" -Body $body
}

$listener.Start()
Write-Output "Static demo server listening on http://localhost:3000/"

while ($true) {
  $client = $null
  $stream = $null

  try {
    $client = $listener.AcceptTcpClient()
    $stream = $client.GetStream()
    $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::ASCII, $false, 8192, $true)
    $requestLine = $reader.ReadLine()
    if ([string]::IsNullOrWhiteSpace($requestLine)) {
      continue
    }

    $parts = $requestLine.Split(" ")
    $method = $parts[0]
    $rawPath = if ($parts.Length -gt 1) { $parts[1] } else { "/" }
    $pathOnly = $rawPath.Split("?")[0]

    while (($line = $reader.ReadLine()) -ne "") {
      if ($null -eq $line) {
        break
      }
    }

    if ($method -eq "GET" -and $pathOnly -eq "/health") {
      Send-JsonResponse -Stream $stream -Data @{
        ok = $true
        mode = "static-demo"
        note = "UI preview server only. Realtime room and socket features need the Node backend."
        timestamp = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
      }
      continue
    }

    if ($method -eq "GET" -and $pathOnly -eq "/api/runtime-config") {
      Send-JsonResponse -Stream $stream -Data @{
        serverOrigin = "http://localhost:3000"
        publicBaseUrl = "http://localhost:3000"
        translationProvider = "demo-static-preview"
        httpsEnabled = $false
        speechToTextConfigured = $false
      }
      continue
    }

    $filePath = Resolve-StaticPath -UrlPath $pathOnly
    if ($null -ne $filePath) {
      $body = [System.IO.File]::ReadAllBytes($filePath)
      Send-Response -Stream $stream -StatusCode 200 -StatusText "OK" -ContentType (Get-ContentType -Path $filePath) -Body $body
      continue
    }

    Send-JsonResponse -Stream $stream -Data @{
      ok = $false
      message = "Not found in static demo server."
      path = $pathOnly
    } -StatusCode 404 -StatusText "Not Found"
  } catch {
    if ($null -ne $stream) {
      try {
        Send-JsonResponse -Stream $stream -Data @{
          ok = $false
          message = $_.Exception.Message
        } -StatusCode 500 -StatusText "Internal Server Error"
      } catch {
      }
    }
  } finally {
    if ($null -ne $stream) { $stream.Dispose() }
    if ($null -ne $client) { $client.Dispose() }
  }
}
