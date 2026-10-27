// Configuración de Hub Comex.
// Completar antes de publicar (ver README.md, sección "Configuración en Azure").
window.HUB_CONFIG = {
  // 'sharepoint': ingreso con la cuenta de Microsoft; fotos en la biblioteca y registros en la lista de SharePoint
  //               (abajo, "sharepoint"). Requiere los permisos aprobados por un administrador (README.md).
  // 'firebase'  : la app anterior (provisional). Se conserva solo para traer sus registros a SharePoint.
  // 'prueba'    : se elige Ventas o Soporte al ingresar y todo se guarda solo en el dispositivo (también con …/#demo).
  // 'microsoft' : ingreso con la cuenta de Microsoft y fotos en el OneDrive de cada cuenta.
  modo: 'sharepoint',

  // Dónde se guarda todo en modo 'sharepoint'. Biblioteca y lista se buscan por su dirección (lo que va en la URL).
  sharepoint: {
    sitio: 'marcalman.sharepoint.com:/sites/EspacioColaborativo',
    biblioteca: 'HubComex',          // …/sites/EspacioColaborativo/HubComex: fotos, Despachos/<carpeta> y Traslados/<carpeta>
    nombreBiblioteca: 'Hub Comex',   // como se ve en SharePoint (solo para los textos de la app)
    lista: 'HubComexRegistros'       // …/sites/EspacioColaborativo/Lists/HubComexRegistros: una fila por registro
  },

  // Carpeta dentro de la biblioteca (u OneDrive) donde van "Despachos" y "Traslados". '' = en la raíz de la biblioteca.
  carpetaRaiz: '',

  // false: sin cuentas, se elige Ventas o Soporte al ingresar; la app se identifica de forma anónima ante Firebase
  //        (Authentication → Anónimo habilitado; reglas: request.auth != null).
  // true : correo y contraseña creados en Firebase → Authentication (y reglas solo para esos correos).
  firebaseCuentas: false,

  // Proyecto de Firebase "hub-comex" de la app anterior. Se usa solo para "Traer registros de Firebase" (menú de Soporte).
  // No es una contraseña: es la dirección pública del proyecto. La seguridad la dan las reglas de Firestore.
  firebase: {
    apiKey: 'AIzaSyCYDX-w_gD3XJ7BAdi5U0m8UFnP3RYSnwc',
    authDomain: 'hub-comex.firebaseapp.com',
    projectId: 'hub-comex',
    storageBucket: 'hub-comex.firebasestorage.app',
    messagingSenderId: '130916289619',
    appId: '1:130916289619:web:90518a5a48496eda6acaa6'
  },

  // Registro de la app en Microsoft Entra ID (Azure) → "Id. de aplicación (cliente)".
  // Registro propio "Hub Comex". Un administrador debe aprobar sus permisos (README.md, sección 1).
  clientId: '3abc78ee-335d-4231-a7d2-4dab471900a5',
  // Microsoft Entra ID → "Id. de directorio (inquilino)"
  tenantId: '8f9b210d-f5e5-404f-9fed-a0a827154105',

  // Permiso delegado que pide la app (aprobado por el administrador el 2026-10-27, igual que en Hub Recepción).
  // Modo 'sharepoint': API de SharePoint con AllSites.Write; la app solo llega a lo que la cuenta que ingresa
  // ya puede ver en SharePoint. Modo 'microsoft' (OneDrive): ['User.Read', 'Files.ReadWrite'].
  permisos: ['https://marcalman.sharepoint.com/AllSites.Write'],

  // Administrador fijo: siempre puede hacer todo y es el único que edita los accesos (menú → Accesos).
  administrador: 'sistemasdegestion@healthyfood.com.ec',

  // Cuentas iniciales y su rol. Solo valen hasta que el administrador guarde los accesos desde la app
  // (quedan en SharePoint: biblioteca Hub Comex → _config/accesos.json); desde ahí manda esa lista.
  // "ventas": Despachos, Traslados, editar y eliminar. "soporte": todo, y además traer registros de la app anterior.
  correosPermitidos: {
    'ventas-sales@healthyfood.com.ec': 'ventas',
    'notificaciones@healthyfood.com.ec': 'soporte'
  },

  // Listas desplegables: se cargan desde catalogos.js (generado del Excel "LISTA DESPLEGABLE APP COMEX.xlsx"
  // con herramientas/excel-a-catalogos.py). Esto de abajo solo se usa si catalogos.js no existe.
  catalogos: {
    clientes: [],
    destinos: [],
    lugaresCarga: [],
    transportistas: [],
    navieras: [],
    productos: [
      // { cliente: 'Goya Foods Inc.', producto: 'Pulpa de mango 14 oz', codigo: 'PM-014' },
    ]
  },

  // Datos del encabezado del informe en Word (los asigna Calidad / el sistema de gestión).
  informe: {
    codigo: 'HF-LOG-___',
    revision: '___',
    empresa: 'Healthy Food Marcalman Ecuador S.A.S.'
  }
};
