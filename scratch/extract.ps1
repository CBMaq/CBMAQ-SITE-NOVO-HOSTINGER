$backupPath = "c:\AppsAntigravity\cbmaq_site\apps\web\scratch\log_backup.txt"
$steps = @(291, 316, 403, 415, 586, 622, 813, 899)
$outputDir = "c:\AppsAntigravity\cbmaq_site\apps\web\scratch\extracted_steps"
if (!(Test-Path $outputDir)) { New-Item -ItemType Directory -Path $outputDir }

Get-Content $backupPath | ForEach-Object {
    $line = $_
    foreach ($step in $steps) {
        if ($line -like "*`"step_index`":$step,*") {
            $line | Out-File -FilePath "$outputDir\step_$step.json" -Encoding utf8
        }
    }
}
