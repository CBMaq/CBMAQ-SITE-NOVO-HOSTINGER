/**
 * Mapa canônico de todas as permissões do painel administrativo.
 * Cada `key` deve corresponder ao `permissionKey` definido no AdminSidebar.
 * ADMINs têm bypass total e não usam este sistema.
 */

export interface Permission {
  key: string;
  label: string;
  group: string | null;
}

export const ALL_PERMISSIONS: Permission[] = [
  { key: "dashboard",           label: "Início",               group: null },
  { key: "leads",               label: "Leads (CRM)",          group: null },
  { key: "blog",                label: "Blog",                  group: "Blog" },
  { key: "blog_postagens",      label: "↳ Postagens",          group: "Blog" },
  { key: "blog_categorias",     label: "↳ Categorias",         group: "Blog" },
  { key: "blog_tags",           label: "↳ Tags",               group: "Blog" },
  { key: "curriculos",          label: "Currículos",           group: null },
  { key: "maquinas",            label: "Máquinas e Motores",   group: "Máquinas e Motores" },
  { key: "maquinas_catalogo",   label: "↳ Máquinas",           group: "Máquinas e Motores" },
  { key: "maquinas_motores",    label: "↳ Motores",            group: "Máquinas e Motores" },
  { key: "maquinas_marcas",     label: "↳ Marcas",             group: "Máquinas e Motores" },
  { key: "maquinas_categorias", label: "↳ Categorias (Máq.)",  group: "Máquinas e Motores" },
  { key: "vendas_governo",      label: "Atas de Registro",     group: null },
  { key: "galeria",             label: "Galeria",              group: null },
  { key: "usuarios",            label: "Usuários",             group: null },
  { key: "configuracoes",       label: "Configurações",        group: null },
];

/** Grupos que possuem sub-itens (para lógica de expand automático) */
export const PERMISSION_GROUPS = ["Blog", "Máquinas e Motores"];

/** Retorna true se o usuário tem acesso a uma permissão */
export function hasPermission(
  role: string,
  permissions: string[],
  key: string
): boolean {
  if (role === "ADMIN") return true;
  return permissions.includes(key);
}
