# Permisos de Azure de Hub Comex

**Estado (2026-10-27): APROBADO. No hace falta pedir nada más.**

Registro de aplicación **Hub Comex** en Microsoft Entra ID:
- Id. de aplicación (cliente): `3abc78ee-335d-4231-a7d2-4dab471900a5`
- Id. de directorio (inquilino): `8f9b210d-f5e5-404f-9fed-a0a827154105`

## Lo que aprobó el administrador

| API | Permiso | Tipo | Para qué |
|---|---|---|---|
| SharePoint | `AllSites.Write` | Delegado | **El que usa la app**: leer y escribir la biblioteca *Hub Comex* y la lista *HubComexRegistros* de EspacioColaborativo |
| SharePoint | `AllSites.Read` | Delegado | No lo usa la app (se puede dejar) |
| Microsoft Graph | `User.Read` | Delegado | Inicio de sesión |
| Microsoft Graph | `Files.ReadWrite` | Delegado | No lo usa la app (era para la versión de OneDrive; se puede quitar) |

- Todos tienen el consentimiento de administrador concedido para Healthy Food.
- La app usa la **API de SharePoint** (`https://marcalman.sharepoint.com/_api/v2.0`), que tiene la misma forma que Graph para archivos y listas. Por eso **no** hace falta Graph `Sites.ReadWrite.All`, que fue lo que se pidió primero.
- Es un permiso **delegado**: la app actúa como la persona que inició sesión y solo llega a lo que esa cuenta ya puede ver en SharePoint.

## URI de redirección (SPA)

Ya están registradas: probado el 2026-10-27, el inicio de sesión funciona en las dos.
- `https://sisgeshealthy.github.io/hub-comex/`
- `http://localhost:5500/`

## Recomendado (opcional, para el administrador)

- **Propietarios:** agregar `sistemasdegestion@healthyfood.com.ec`. Así la cuenta de la empresa administra el registro y no depende de quien lo creó.
- **Aplicaciones empresariales → Hub Comex:**
  - En Propiedades, **¿Se requiere asignación? = Sí**.
  - En Usuarios y grupos, asignar a `ventas-sales@`, `notificaciones@` y `sistemasdegestion@`.
  - La app ya filtra por correo; esto lo bloquea también en Microsoft.
- **Quitar** Graph `Files.ReadWrite`: la app no lo usa.

## Si algún día se crea un registro nuevo

- SPA con las dos URI de arriba.
- Permiso delegado **SharePoint → AllSites.Write**, con consentimiento de administrador.
- Poner el nuevo id en `config.js` → `clientId`.
