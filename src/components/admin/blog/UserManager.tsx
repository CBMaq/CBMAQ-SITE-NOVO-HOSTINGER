"use client";

import { useState } from "react";
import { 
  UserPlus, 
  Trash2, 
  Search,
  Shield,
  User as UserIcon,
  Power,
  KeyRound,
  Check,
  Pencil,
} from "lucide-react";
import { 
  createUser, 
  toggleUserStatus, 
  deleteUser,
  updateUserPermissions,
  updateUser,
} from "@/app/actions/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ALL_PERMISSIONS, Permission } from "@/lib/permissions";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  isActive: boolean;
  permissions: string[];
  createdAt: Date;
}

interface UserManagerProps {
  initialUsers: User[];
  currentUserId: string;
}

// ─── Permissions Toggle Panel ────────────────────────────────────────────────

function PermissionsPanel({
  value,
  onChange,
}: {
  value: string[];
  onChange: (keys: string[]) => void;
}) {
  // Group permissions
  const groups: { name: string | null; items: Permission[] }[] = [];
  const seen = new Set<string | null>();

  for (const p of ALL_PERMISSIONS) {
    if (!seen.has(p.group)) {
      seen.add(p.group);
      groups.push({ name: p.group, items: [] });
    }
    groups.find(g => g.name === p.group)!.items.push(p);
  }

  const toggle = (key: string) => {
    if (value.includes(key)) {
      onChange(value.filter(k => k !== key));
    } else {
      onChange([...value, key]);
    }
  };

  const toggleAll = () => {
    if (value.length === ALL_PERMISSIONS.length) {
      onChange([]);
    } else {
      onChange(ALL_PERMISSIONS.map(p => p.key));
    }
  };

  return (
    <div className="space-y-4">
      {/* Select all */}
      <div className="flex items-center justify-between pb-2 border-b border-border/50">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Permissões de Acesso
        </span>
        <button
          type="button"
          onClick={toggleAll}
          className="text-xs text-primary hover:underline font-medium"
        >
          {value.length === ALL_PERMISSIONS.length ? "Desmarcar tudo" : "Marcar tudo"}
        </button>
      </div>

      <div className="space-y-5 max-h-[320px] overflow-y-auto pr-1">
        {groups.map((group, gi) => (
          <div key={gi} className="space-y-2">
            {group.name && (
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 pl-1">
                {group.name}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((perm) => {
                const isOn = value.includes(perm.key);
                return (
                  <button
                    key={perm.key}
                    type="button"
                    onClick={() => toggle(perm.key)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isOn
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span>{perm.label}</span>
                    {/* Switch visual */}
                    <span
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
                        isOn ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200 ${
                          isOn ? "translate-x-4" : "translate-x-1"
                        }`}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Counter */}
      <p className="text-xs text-muted-foreground text-right pt-1 border-t border-border/30">
        {value.length} de {ALL_PERMISSIONS.length} permissões ativas
      </p>
    </div>
  );
}

// ─── Edit Permissions Modal ───────────────────────────────────────────────────

function EditPermissionsDialog({ user, onSave }: { user: User; onSave: (id: string, perms: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const [permissions, setPermissions] = useState<string[]>(user.permissions ?? []);
  const [saving, setSaving] = useState(false);

  // Reset on open
  const handleOpen = (v: boolean) => {
    if (v) setPermissions(user.permissions ?? []);
    setOpen(v);
  };

  const handleSave = async () => {
    setSaving(true);
    const result = await updateUserPermissions(user.id, permissions);
    if (result.success) {
      onSave(user.id, permissions);
      setOpen(false);
    } else {
      alert("Erro ao salvar permissões.");
    }
    setSaving(false);
  };

  if (user.role === "ADMIN") {
    return (
      <Badge className="bg-primary/10 text-primary border-none hover:bg-primary/15 rounded-full px-3 text-xs gap-1">
        <Shield className="h-3 w-3" />
        Acesso Total
      </Badge>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <button
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors group"
          title="Editar permissões"
        >
          <KeyRound className="h-3.5 w-3.5 group-hover:text-primary" />
          <span>{(user.permissions ?? []).length} permissões</span>
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif">Permissões — {user.name || user.email}</DialogTitle>
          <DialogDescription>
            Defina quais menus e páginas este usuário poderá acessar.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          <PermissionsPanel value={permissions} onChange={setPermissions} />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="rounded-xl">
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={saving} className="rounded-xl min-w-[120px]">
            {saving ? "Salvando..." : "Salvar Permissões"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Edit User Modal ────────────────────────────────────────────────────────
function EditUserDialog({ user, onSave }: { user: User; onSave: (updatedUser: User) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [permissions, setPermissions] = useState<string[]>(user.permissions ?? []);
  const [saving, setSaving] = useState(false);

  const handleOpen = (v: boolean) => {
    if (v) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPassword("");
      setPermissions(user.permissions ?? []);
    }
    setOpen(v);
  };

  const handleSave = async () => {
    setSaving(true);
    const result = await updateUser(user.id, {
      name,
      email,
      password,
      permissions
    });
    
    if (result.success && result.data) {
      onSave(result.data as User);
      setOpen(false);
    } else {
      alert(result.error || "Erro ao salvar usuário.");
    }
    setSaving(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full h-8 w-8"
          title="Editar Usuário"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col h-full w-full sm:max-w-[800px] p-0 border-none sm:border-l">
        <SheetHeader className="p-6 border-b shrink-0 bg-background z-10">
          <SheetTitle className="text-xl font-serif">Editar Usuário</SheetTitle>
          <SheetDescription>
            Altere as informações ou senha do usuário.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="space-y-2">
            <Label>Nome Completo</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label>E-mail</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label>Nova Senha (opcional)</Label>
            <Input
              type="password"
              placeholder="Deixe em branco para não alterar"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl"
            />
          </div>
          {user.role !== "ADMIN" && (
            <div className="pt-2">
              <PermissionsPanel value={permissions} onChange={setPermissions} />
            </div>
          )}
        </div>
        <SheetFooter className="p-6 border-t bg-muted/20 shrink-0">
          <Button variant="outline" onClick={() => setOpen(false)} className="rounded-xl">
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={saving || !email} className="rounded-xl min-w-[120px]">
            {saving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function UserManager({ initialUsers, currentUserId }: UserManagerProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form states
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPermissions, setNewPermissions] = useState<string[]>([]);

  const filteredUsers = users.filter((u) =>
    (u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     u.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  async function handleAdd() {
    if (!newEmail.trim() || !newPassword.trim()) return;
    setIsAdding(true);

    const result = await createUser({
      name: newName,
      email: newEmail,
      password: newPassword,
      role: "WRITER",
      permissions: newPermissions,
    });

    if (result.success && result.data) {
      setUsers([result.data as User, ...users]);
      setNewName("");
      setNewEmail("");
      setNewPassword("");
      setNewPermissions([]);
      setIsDialogOpen(false);
    } else {
      alert(result.error);
    }
    setIsAdding(false);
  }

  async function handleToggleStatus(id: string, currentStatus: boolean) {
    const result = await toggleUserStatus(id, !currentStatus);
    if (result.success) {
      setUsers(users.map(u => u.id === id ? { ...u, isActive: !currentStatus } : u));
    } else {
      alert(result.error);
    }
  }

  async function handleDelete(id: string) {
    if (id === currentUserId) {
      alert("Você não pode excluir a si mesmo.");
      return;
    }
    if (!confirm("Tem certeza que deseja excluir este usuário permanentemente?")) return;

    const result = await deleteUser(id);
    if (result.success) {
      setUsers(users.filter((u) => u.id !== id));
    } else {
      alert(result.error);
    }
  }

  function handlePermissionsSaved(id: string, perms: string[]) {
    setUsers(users.map(u => u.id === id ? { ...u, permissions: perms } : u));
  }

  function handleUserUpdated(updatedUser: User) {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 rounded-xl"
          />
        </div>

        <Sheet open={isDialogOpen} onOpenChange={(v) => {
          setIsDialogOpen(v);
          if (!v) { setNewName(""); setNewEmail(""); setNewPassword(""); setNewPermissions([]); }
        }}>
          <SheetTrigger asChild>
            <Button className="h-11 rounded-xl px-6 gap-2 bg-primary hover:bg-primary/90">
              <UserPlus className="h-5 w-5" />
              Novo Usuário
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col h-full w-full sm:max-w-[800px] p-0 border-none sm:border-l">
            <SheetHeader className="p-6 border-b shrink-0 bg-background z-10">
              <SheetTitle className="text-2xl font-serif">Novo Usuário</SheetTitle>
              <SheetDescription>
                Crie um novo acesso para o painel administrativo e defina as permissões.
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="space-y-2">
                <Label>Nome Completo</Label>
                <Input
                  placeholder="Nome do colaborador"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>E-mail</Label>
                <Input
                  type="email"
                  placeholder="email@empresa.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Senha</Label>
                <Input
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              {/* Permissions */}
              <div className="pt-2">
                <PermissionsPanel value={newPermissions} onChange={setNewPermissions} />
              </div>
            </div>
            <SheetFooter className="p-6 border-t bg-muted/20 shrink-0">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-xl">
                Cancelar
              </Button>
              <Button onClick={handleAdd} disabled={isAdding || !newEmail || !newPassword} className="rounded-xl min-w-[120px]">
                {isAdding ? "Criando..." : "Criar Usuário"}
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="bg-background border border-border rounded-3xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="py-4">Usuário</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Acessos</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="group transition-colors border-border/50">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-primary/10 rounded-full flex items-center justify-center">
                      <UserIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{user.name || "Sem Nome"}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                        Desde {format(new Date(user.createdAt), "dd/MM/yy", { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{user.email}</TableCell>
                <TableCell>
                  <EditPermissionsDialog user={user} onSave={handlePermissionsSaved} />
                </TableCell>
                <TableCell>
                  <Badge variant={user.isActive ? "default" : "secondary"} className={user.isActive ? "bg-emerald-500 hover:bg-emerald-600 rounded-full" : "rounded-full"}>
                    {user.isActive ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <EditUserDialog user={user} onSave={handleUserUpdated} />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full h-8 w-8"
                      onClick={() => handleToggleStatus(user.id, user.isActive)}
                      title={user.isActive ? "Desativar" : "Ativar"}
                    >
                      <Power className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full h-8 w-8"
                      onClick={() => handleDelete(user.id)}
                      disabled={user.id === currentUserId}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
