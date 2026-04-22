param(
  [string]$DnsName = "localhost",
  [string]$OutDir = "ssl",
  [string]$PfxPassword = "prismtalk-local"
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$absoluteOutDir = Join-Path $projectRoot $OutDir
New-Item -ItemType Directory -Force -Path $absoluteOutDir | Out-Null

$cert = New-SelfSignedCertificate `
  -DnsName $DnsName `
  -CertStoreLocation "Cert:\CurrentUser\My" `
  -FriendlyName "PrismTalk Localhost Dev" `
  -KeyAlgorithm RSA `
  -KeyLength 2048 `
  -HashAlgorithm SHA256 `
  -NotAfter (Get-Date).AddYears(3)

$password = ConvertTo-SecureString -String $PfxPassword -AsPlainText -Force
$pfxPath = Join-Path $absoluteOutDir "localhost-dev.pfx"
$cerPath = Join-Path $absoluteOutDir "localhost-dev.cer"

Export-PfxCertificate -Cert "Cert:\CurrentUser\My\$($cert.Thumbprint)" -FilePath $pfxPath -Password $password | Out-Null
Export-Certificate -Cert "Cert:\CurrentUser\My\$($cert.Thumbprint)" -FilePath $cerPath | Out-Null

$trusted = $false

try {
  $x509 = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2($cerPath)
  $store = New-Object System.Security.Cryptography.X509Certificates.X509Store("Root", "CurrentUser")
  $store.Open([System.Security.Cryptography.X509Certificates.OpenFlags]::ReadWrite)
  $store.Add($x509)
  $store.Close()
  $trusted = $true
} catch {
  Write-Warning "CurrentUser Root 저장소 신뢰 등록을 완료하지 못했습니다. 브라우저에서 최초 1회 보안 경고가 뜰 수 있습니다."
}

Write-Output "Created PFX: $pfxPath"
Write-Output "Created CER: $cerPath"
if ($trusted) {
  Write-Output "Trusted certificate in CurrentUser Root store."
} else {
  Write-Output "Certificate trust registration skipped."
}
Write-Output "PFX password: $PfxPassword"
