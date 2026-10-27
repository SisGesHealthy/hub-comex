# Hub Comex: contexto del proyecto

> Este archivo resume todo el proyecto para que otro chat de Claude pueda seguir el trabajo.
> Si usas **Claude Code**, deja este archivo en la carpeta raíz del proyecto con el nombre `CLAUDE.md`; Claude lo lee solo.
> Si usas **claude.ai (chat)**, adjúntalo al inicio de la conversación o súbelo como conocimiento de un Proyecto.
> Actualizado al 2026-10-26.

## Qué es
- **Hub Comex** (antes "Hub Despachos") es una web app / PWA para el área de **Ventas (Comex)** de Healthy Food Marcalman Ecuador S.A.S.
- Ventas registra **despachos** (exportación) y **traslados** de producto.
- Ventas toma fotos con el celular, las revisa (acepta o repite) y las sube.
- Ventas llena los datos del informe y descarga un **informe Word** con el formato oficial.
- Todo queda en un registro que se puede buscar.
- **Antes:** Ventas pasaba las fotos a mano a la compu para redactar el informe.

## Personas y cuentas
- **Desarrollador:** pasante / soporte del Área de Innovación y Mantenimiento.
  - También hizo Hub Agrícola (https://sisgeshealthy.github.io/hub-agricola/) y HUB Recepciones (https://sisgeshealthy.github.io/hub-recepcion).
  - Patrón de esas apps: GitHub Pages, instalable desde Chrome, login con la cuenta Microsoft de la empresa, cada usuario ve su área y soporte ve todo.
- **Cuenta de Ventas:** ventas-sales@healthyfood.com.ec, la cuenta del cargo que pasa al siguiente encargado.
- **Cuenta de Soporte:** notificaciones@healthyfood.com.ec. Puede hacer todo lo que hace Ventas.
- **Cuenta de GitHub/Azure de la empresa:** sistemasdegestion@healthyfood.com.ec (org GitHub `sisgeshealthy`). No se usa para entrar a la app.

## Dónde está publicada
- **URL actual:** https://argalvez-oss.github.io/hub-comex/ (GitHub personal del desarrollador, repo `argalvez-oss/hub-comex`).
- Los archivos se suben a mano por la web de GitHub, desde la carpeta `subir-a-github/`, que es una copia limpia de lo publicable.
- Al cambiar algo, se sube `VERSION` en `sw.js` (va en **hc-v16**). Después se recarga la app dos veces en cada dispositivo.
- **Ventas ya la usa en producción**; por ejemplo, el registro real "TRASLADO CONT 22-26 MERICA", con 14 fotos.
  - **No borrar datos reales.** Para pruebas, crear un registro con "(borrar)" en el nombre y borrar solo ese.
  - O probar en modo local con `…/#demo`, que no toca la nube.

## Tecnología
- **Base:** JavaScript sin framework, un solo `app.js`, con service worker (`sw.js`) para que abra rápido y funcione sin señal.
- **`config.js`, campo `modo`:**
  - `'firebase'`: **el modo actual**.
  - `'prueba'`: los datos quedan solo en el dispositivo. También se activa abriendo la URL con `#demo`.
  - `'microsoft'`: MSAL + Graph/OneDrive. Está en pausa (ver Pendientes).
- **Firebase (solución provisional):**
  - Proyecto `hub-comex`, plan gratis Spark, SDK compat 10.14.1.
  - Ingreso: la pantalla de inicio deja **elegir Ventas o Soporte**, sin contraseña, y por detrás usa **inicio anónimo** de Firebase.
  - Reglas de Firestore: `allow read, write: if request.auth != null;`.
  - El desarrollador **no quiere cuentas por ahora** (`firebaseCuentas: false`).
  - Colecciones:
    - `registros`: un documento por despacho o traslado.
    - `fotos`: la foto completa dentro de Firestore como Bytes, 1920 px, calidad 0.86, ≤ 950 KB.
    - `miniaturas`: 360 px.
  - Las fotos **no están en ninguna carpeta**. Por eso existen el visor y el botón .zip.
  - Hay tiempo real (`onSnapshot`) y persistencia offline.
  - El código de Firebase imita las llamadas de Graph (`fbGraph`), para reutilizar el flujo de OneDrive.
- **Informe Word:** `informe.js` usa la librería `docx` 9.5.1 (CDN jsdelivr) y se genera en el navegador. El logo va incrustado en base64 dentro de `informe.js`.
- **Zip de fotos:** JSZip 3.10.1.
- **Listas desplegables:** vienen de `LISTA DESPLEGABLE APP COMEX.xlsx`, convertido con `herramientas/excel-a-catalogos.py` a `catalogos.js` (`window.HUB_CATALOGOS`).
  - Contenido: 4 clientes, 40 productos con código PTEXPxxx, 11 destinos, 2 lugares de carga y 3 navieras.

## Cómo funciona la app (lo que pidió el usuario)
- **Inicio:** "¿Qué vas a registrar hoy?" con dos tarjetas, **Despachos** y **Traslados**.
  - Cada área tiene su barra inferior: [área] / + Nuevo / Registros.
  - "‹ Inicio" vuelve a las áreas.
- **Registros:** búsqueda por nombre, fechas y estado; descarga del informe.
- **Estados:** En proceso / Cerrado, con opción de **reabrir**. Al cerrar, vuelve al inicio.
- **Fotos en dos pasos:**
  - Tomar (o elegir de la galería) → revisar → aceptar o repetir.
  - Las aceptadas quedan "sin subir" en el celular y se pueden eliminar con la X.
  - El botón "Subir N" las sube.
  - No se puede cerrar un registro con fotos sin subir.
- **Visor:** al tocar una foto se abre a pantalla completa en alta calidad, con ‹ › y "Descargar foto". La miniatura de la lista es pequeña; por eso "Abrir en" sobre la miniatura se veía borroso.
- **"Descargar fotos (.zip)":** baja **todas** las fotos del registro, marcadas o no.
- **Fotos del informe:** se marcan con la estrella, que muestra el número de orden en el informe.
  - El botón **"Ordenar fotos del informe"** permite arrastrar desde la manija ⠿ o usar flechas ↑↓.
  - El orden es el del arreglo `informeFotos`.
  - En el informe van de 2 en 2, con títulos "Foto 1:", "Foto 2:"…
- **Datos:** todos los campos del informe se llenan en la app y se guardan solos.
  - Cliente, Destino, Lugar de carga y Naviera son listas desplegables propias (`.sel`): fuente de la app, esquinas redondeadas y la opción elegida en gris. Tienen "Otro (escribir)".
  - El producto se filtra estrictamente por el cliente y su código se autollena.
  - "Destino final" fue eliminado.
- **Al cerrar:** si faltan datos, solo avisa; se puede "Cerrar de todas formas".
- **Eliminar:** ambas cuentas pueden eliminar un despacho o traslado, con confirmación.
- **Trazabilidad:** se guardan creadoPor/creado, cerradoPor/cerrado, reabiertoPor/reabierto y modificadoPor/modificado. En la app se muestra solo **quién**; en la app no se muestran horas, solo la fecha.

## Formato del informe (`informe.js`)
- **Encabezado:** logo tal cual la imagen original (`icons/logo-hf.png`), título "INFORME DE DESPACHO/TRASLADO", Código `HF-LOG-___`, Revisión `___` y Página. Los valores oficiales de código y revisión siguen pendientes.
- **Secciones:**
  1. Datos generales:
     - Operación, Fecha, Cliente, Destino, Lugar de carga, Pedido/OC, Factura/DAE, Responsable, C.I. y Carpeta.
     - **Hora de inicio** = hora en que se creó el registro.
     - **Hora de fin** = hora en que se cerró (vacía si sigue en proceso).
  2. Transporte: Tipo Reefer/Camión, sin la fila de hora de ingreso/fin.
  3. Inspección previa: 6 puntos Sí/No con observación.
  4. Estiba, sellos y cierre.
  5. Detalle de carga: N.º, Producto, Código y Cantidad, con una fila por producto. Total cajas y Total pallets se llenan a mano.
  6. Observaciones.
  7. Registro fotográfico: las fotos marcadas, en el orden elegido. Sin fotos, 10 casillas vacías.
  8. "Personal a cargo del despacho/traslado": Jefe de Calidad, Responsable de sellos y Bodega (3 nombres).
- **Referencias:** `FORMATO DESPAHO-TRASLADO HF_Valido.docx` es el formato original. `Informe de traslado - 2026-10-22 - CONT 22-26 MERICA.docx` es el formato final acordado; su contenido es solo de ejemplo.

## Archivos
| Archivo | Para qué |
|---|---|
| `index.html`, `app.js`, `styles.css`, `sw.js`, `manifest.webmanifest`, `icons/` | La app |
| `config.js` | Modo, firebaseConfig, Azure (clientId/tenantId), correos permitidos, datos del informe |
| `catalogos.js` | Listas desplegables generadas desde el Excel |
| `informe.js` | Formato del informe Word |
| `subir-a-github/` | Copia limpia para subir a GitHub |
| `herramientas/excel-a-catalogos.py` | Convierte el Excel a `catalogos.js` (requiere openpyxl) |
| `demo/armar-demo.ps1` | Arma un demo de un solo archivo (`demo/hub-comex-demo.html`) |
| `README.md` | Instrucciones de configuración, incluida la de Firebase |

## Pendientes / futuro
1. **Pasar a SharePoint y login con Microsoft** (la solución definitiva).
   - El registro de Azure "Hub Comex" (clientId `3abc78ee-335d-4231-a7d2-4dab471900a5`, tenant `8f9b210d-f5e5-404f-9fed-a0a827154105`) necesita **aprobación de un administrador**. El tenant bloquea el consentimiento de usuarios y el desarrollador no es admin.
   - Alternativa: reusar el registro de Azure de **Hub Recepción**, que ya tiene `Sites.ReadWrite.All` aprobado por admin.
   - El plan es guardar los registros en una lista de SharePoint y las fotos en una biblioteca, manteniendo la trazabilidad.
2. Cuentas de Firebase con correo y contraseña, si se decide (hoy el ingreso es anónimo).
3. Campos propios de **Traslados**: hoy usan los mismos que Despachos. Falta la información de Ventas.
4. Valores oficiales de Código y Revisión del informe.
5. Confirmar si un despacho puede ser nacional (casilla Operación) y si hay responsables por defecto.

## Forma de trabajar con el usuario
- Escribir en español, paso a paso y con lenguaje simple.
- **Consultar cualquier duda antes de realizar un paso.** Dar ideas u opciones primero, recomendar una y esperar la elección.
- Probar los cambios antes de entregarlos. Al terminar, decir exactamente qué archivos de `subir-a-github/` hay que subir y recordar subir `VERSION` en `sw.js`.
