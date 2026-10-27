# Hub Comex

App del área de Ventas para registrar **despachos y traslados**: fotos, datos del informe, inspección previa e informe en Word.

- **Dirección:** https://sisgeshealthy.github.io/hub-comex/ (cuenta de GitHub **SisGesHealthy**, la de sistemasdegestion@).
- **Ingreso:** cuenta Microsoft de la empresa.
- **Configuración** (menú de la cuenta → **Configuración: listas y accesos**):
  - **Personal a cargo:** listas de Calidad (Jefe de Calidad), Sellos y Bodega (los tres campos), iguales en Despachos y Traslados. Se pueden agregar, quitar y ordenar nombres. Queda en `_config/listas.json`; los valores iniciales están en `config.js` → `listasPersonal`.
- **Accesos:** también en Configuración. Solo lo ve el administrador fijo (`config.js` → `administrador`, sistemasdegestion@).
  - Por cada cuenta se elige: **Despachos** y/o **Traslados**; **Editar** (sin esto, solo ve y descarga); **Eliminar** (registros y fotos); **Soporte** (todo, más traer registros de Firebase).
  - Se guarda en la biblioteca → `_config/accesos.json`. Esa carpeta es de **solo lectura para los integrantes del sitio**, así que solo el administrador y los propietarios pueden cambiarla.
  - Cada cuenta toma los cambios al abrir la app.
  - Mientras no se guarde desde la app, valen las cuentas de `config.js` → `correosPermitidos` (ventas-sales@ = Ventas, notificaciones@ = Soporte).
- **Dónde se guarda** (`config.js` → `modo: 'sharepoint'`), en el sitio **EspacioColaborativo**:
  - **Fotos:** biblioteca *Hub Comex* (`/sites/EspacioColaborativo/HubComex`) → `Despachos/` o `Traslados/` → `AAAA-MM-DD - <nombre>/Foto_001.jpg`. Cualquiera con acceso al sitio las abre desde SharePoint.
  - **Registros:** lista *HubComexRegistros*, una fila por despacho o traslado.
    - Columnas para ver y filtrar: Tipo, Estado, Fecha, Cliente, Destino, Pedido, Factura, Contenedor, Fotos, Carpeta, CreadoPor, CerradoPor, Cerrado y ModificadoPor.
    - La columna **Datos** tiene el registro completo y es la que usa la app. **No editar Datos a mano.**
  - Las otras cuentas ven los cambios en ≤ 30 s y al volver a la app. Sin señal, los datos y las fotos esperan en el celular y se suben solos.
- **Sin cuentas extra:** no usa Firebase ni otro servicio. Solo GitHub Pages (SisGesHealthy) y Microsoft 365 de la empresa.
- **App anterior (Firebase):** en el menú de la cuenta, Soporte tiene **Traer registros de Firebase**.
  - Copia a SharePoint los registros y las fotos en tamaño completo.
  - Solo lee Firebase y no duplica lo ya copiado; se puede repetir.

Archivos:
- `index.html`, `styles.css`, `app.js` (toda la lógica)
- `informe.js` (formato del informe Word)
- `config.js` (modo, Azure, SharePoint, correos)
- `catalogos.js` (listas desplegables)
- `sw.js` (instalar y abrir sin señal), `manifest.webmanifest`, `icons/`

## 1. Azure (una sola vez, lo hace un administrador)

**Aprobado el 2026-10-27** (detalle en [SOLICITUD_AZURE.md](SOLICITUD_AZURE.md)). El registro *Hub Comex* (`3abc78ee-…`) tiene:
- URI SPA: `https://sisgeshealthy.github.io/hub-comex/` y `http://localhost:5500/`.
- Permiso delegado **SharePoint `AllSites.Write`** con consentimiento de administrador.

La app usa la API de SharePoint (`https://marcalman.sharepoint.com/_api/v2.0`), que tiene la misma forma que Graph, así que no necesita Graph `Sites.*`.

## 2. SharePoint (hecho el 2026-10-27)

En EspacioColaborativo:
- **Biblioteca** con dirección `HubComex` (título "Hub Comex").
- **Lista** con dirección `HubComexRegistros` (título "Hub Comex - Registros").
  - Columnas de texto: RegistroId, Tipo, Estado, Cliente, Destino, Pedido, Factura, Contenedor, CreadoPor, CerradoPor y ModificadoPor.
  - Columnas de fecha y hora: Fecha y Cerrado.
  - Número: Fotos.
  - Varias líneas de texto sin formato: Carpeta y Datos.

ventas-sales@ y notificaciones@ necesitan permiso de **Editar** en el sitio, o en la biblioteca y la lista.

## 3. Publicar (GitHub Pages, cuenta SisGesHealthy)

Repositorio `SisGesHealthy/hub-comex`, rama `main`, Pages desde `main / (root)`.

**Al publicar cambios**, subir `VERSION` en `sw.js` (por ejemplo `hc-v17` → `hc-v18`) para que los celulares descarguen la versión nueva.

## 4. Probar en la computadora

- Servidor local en el puerto 5500, desde esta carpeta. Abrir `http://localhost:5500/`; tiene que ser `localhost`, no `127.0.0.1`.
- `http://localhost:5500/#demo`: modo prueba. No toca la nube y todo queda en el navegador.
- `referencias/prueba-sp.html`: SharePoint simulado en el navegador, para probar sin permisos de Azure. Firebase sí es real, pero solo de lectura. No se publica.

## 5. Instalar en el celular

Abrir el enlace en **Chrome** → menú **⋮** → **Instalar aplicación**.

## 6. Listas desplegables

Cambiar el Excel *LISTA DESPLEGABLE APP COMEX.xlsx* y ejecutar:
`python herramientas/excel-a-catalogos.py "LISTA DESPLEGABLE APP COMEX.xlsx" catalogos.js`.
Luego publicar `catalogos.js` y subir `VERSION` en `sw.js`.
