# Arma un solo archivo HTML con la app en modo demostración (sin Microsoft), para compartirla como enlace.
# Uso: powershell -File demo\armar-demo.ps1
$raiz = Split-Path $PSScriptRoot -Parent
$enc = New-Object System.Text.UTF8Encoding $false
$css = [IO.File]::ReadAllText("$raiz\styles.css", $enc)
$cfg = [IO.File]::ReadAllText("$raiz\config.js", $enc) + "`n" + [IO.File]::ReadAllText("$raiz\catalogos.js", $enc)
$js  = [IO.File]::ReadAllText("$raiz\informe.js", $enc) + "`n" + [IO.File]::ReadAllText("$raiz\app.js", $enc)

# El visor elige tema claro/oscuro con data-theme; se replica el bloque oscuro para esos casos.
$oscuro = [regex]::Match($css, '@media \(prefers-color-scheme: dark\) \{ :root \{([\s\S]*?)\} \}').Groups[1].Value
$css = $css.Replace('@media (prefers-color-scheme: dark) { :root {', '@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {')
$css += "`n:root[data-theme=`"dark`"] {$oscuro}`n"

$html = @"
<title>Hub Comex</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
$css
</style>
<div id="app"><div class="boot"><div class="mark">HC</div></div></div>
<input type="file" id="cam" accept="image/*" capture="environment" hidden>
<input type="file" id="gal" accept="image/*" multiple hidden>
<script>window.HUB_DEMO = true;</script>
<script>
$cfg
</script>
<script>
$js
</script>
"@
[IO.File]::WriteAllText("$PSScriptRoot\hub-comex-demo.html", $html, $enc)
"Listo: $PSScriptRoot\hub-comex-demo.html"
