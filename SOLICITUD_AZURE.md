# Solicitud al administrador de Microsoft 365 / Azure: Hub Comex

**Para:** administrador de Microsoft Entra ID (Azure) de Healthy Food
**De:** sistemasdegestion@healthyfood.com.ec
**App:** Hub Comex, la app de Ventas para despachos y traslados (fotos, datos e informe Word).
**Dirección:** https://sisgeshealthy.github.io/hub-comex/

La app pasa a guardar todo en SharePoint (sitio **EspacioColaborativo**). Para eso necesita iniciar sesión con la cuenta de la empresa y un permiso de Microsoft Graph que solo un administrador puede aprobar, porque el tenant no deja que los usuarios lo acepten.

## Registro de aplicación (ya existe)

Microsoft Entra ID → **Registros de aplicaciones** → **Todas las aplicaciones** → **Hub Comex**

- Id. de aplicación (cliente): `3abc78ee-335d-4231-a7d2-4dab471900a5`
- Id. de directorio (inquilino): `8f9b210d-f5e5-404f-9fed-a0a827154105`

## Lo que hay que hacer

1. **Propietarios** → *Agregar propietarios* → `sistemasdegestion@healthyfood.com.ec`.
   Así la cuenta de la empresa administra el registro y no depende del pasante que lo creó.

2. **Autenticación** → plataforma **Aplicación de página única (SPA)** → URI de redirección (solo estas dos):
   - `https://sisgeshealthy.github.io/hub-comex/`
   - `http://localhost:5500/` (pruebas en la computadora)

   Si aparece `https://argalvez-oss.github.io/hub-comex/` (la dirección vieja), se puede quitar.
   No hace falta marcar "Tokens de acceso" ni "Tokens de id." (flujo implícito): la app usa PKCE.

3. **Permisos de API** → *Agregar un permiso* → **Microsoft Graph** → **Permisos delegados**:
   - `User.Read`, que ya viene.
   - `Sites.ReadWrite.All`.

   Si está `Files.ReadWrite`, se puede quitar: ya no se usa.

4. En esa misma pantalla: **Conceder consentimiento de administrador para Healthy Food** → **Sí**.
   Las dos filas deben quedar con el visto verde "Concedido para Healthy Food".

5. **Opcional (recomendado):** Entra ID → **Aplicaciones empresariales** → **Hub Comex**:
   - En **Propiedades**, poner **¿Se requiere asignación?** = **Sí**.
   - En **Usuarios y grupos**, asignar a `ventas-sales@`, `notificaciones@` y `sistemasdegestion@`.

   Así nadie más puede iniciar sesión en la app. La app, además, solo deja entrar a esos tres correos.

## Por qué ese permiso

- Es **delegado**: la app actúa como la persona que inició sesión y solo llega a lo que esa cuenta ya puede ver en SharePoint. No es un permiso de aplicación sin usuario.
- La app lee y escribe solo dos cosas en EspacioColaborativo:
  - La biblioteca **Hub Comex**, con las fotos en carpetas.
  - La lista **HubComexRegistros**, con una fila por despacho o traslado.
- `User.Read` sirve para saber quién inició sesión.

## Permisos en SharePoint (sitio EspacioColaborativo)

`ventas-sales@healthyfood.com.ec` y `notificaciones@healthyfood.com.ec` necesitan **Editar** (miembros del sitio), o al menos Editar en la biblioteca *Hub Comex* y en la lista *HubComexRegistros*.

## Si el registro "Hub Comex" no aparece o no se puede editar

Crear uno nuevo:
- **Nuevo registro** → nombre `Hub Comex` → *Solo las cuentas de este directorio organizativo*.
- URI de redirección: SPA `https://sisgeshealthy.github.io/hub-comex/`.
- Luego seguir los pasos 1 a 5 y enviar a sistemasdegestion@ el nuevo **Id. de aplicación (cliente)**.
