import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Users, Settings, Database, Eye, Edit, Trash2 } from 'lucide-react';

interface RolePermissions {
  [key: string]: {
    name: string;
    description: string;
    permissions: string[];
    color: string;
  };
}

const roleDefinitions: RolePermissions = {
  admin: {
    name: 'Administrator',
    description: 'Full system access and user management',
    permissions: ['agents:read', 'agents:write', 'agents:delete', 'users:manage', 'system:admin'],
    color: 'destructive'
  },
  manager: {
    name: 'Manager', 
    description: 'Manage agents and view user data',
    permissions: ['agents:read', 'agents:write', 'agents:delete', 'users:read'],
    color: 'default'
  },
  developer: {
    name: 'Developer',
    description: 'Create and modify agents',
    permissions: ['agents:read', 'agents:write'],
    color: 'secondary'
  },
  user: {
    name: 'User',
    description: 'View agents and basic functionality',
    permissions: ['agents:read'],
    color: 'outline'
  }
};

export const RoleManager = () => {
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState(user?.role || 'user');
  
  const currentRole = roleDefinitions[user?.role || 'user'];
  const hasUserManagePermission = user?.permissions?.includes('users:manage') || false;

  const getPermissionIcon = (permission: string) => {
    if (permission.includes('read')) return <Eye className="h-3 w-3" />;
    if (permission.includes('write')) return <Edit className="h-3 w-3" />;
    if (permission.includes('delete')) return <Trash2 className="h-3 w-3" />;
    if (permission.includes('manage')) return <Users className="h-3 w-3" />;
    if (permission.includes('admin')) return <Shield className="h-3 w-3" />;
    return <Database className="h-3 w-3" />;
  };

  const getPermissionColor = (permission: string) => {
    if (permission.includes('delete') || permission.includes('admin')) return 'destructive';
    if (permission.includes('write') || permission.includes('manage')) return 'default';
    return 'secondary';
  };

  return (
    <div className="space-y-6">
      {/* Current User Role */}
      <Card className="glass border-border/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Your Current Role
              </CardTitle>
              <CardDescription>
                Your current permissions and access level
              </CardDescription>
            </div>
            <Badge variant={currentRole.color as any} className="text-sm">
              {currentRole.name}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {currentRole.description}
          </p>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Permissions:</h4>
            <div className="flex flex-wrap gap-2">
              {currentRole.permissions.map((permission) => (
                <Badge 
                  key={permission} 
                  variant={getPermissionColor(permission) as any}
                  className="flex items-center gap-1 text-xs"
                >
                  {getPermissionIcon(permission)}
                  {permission}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role Definitions */}
      <Card className="glass border-border/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Available Roles
          </CardTitle>
          <CardDescription>
            System role definitions and their permissions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(roleDefinitions).map(([roleKey, role]) => (
            <div 
              key={roleKey} 
              className={`p-4 rounded-lg border ${
                roleKey === user?.role ? 'border-primary bg-primary/5' : 'border-border/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant={role.color as any}>
                    {role.name}
                  </Badge>
                  {roleKey === user?.role && (
                    <Badge variant="outline" className="text-xs">
                      Current
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {role.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {role.permissions.map((permission) => (
                  <Badge 
                    key={permission} 
                    variant="outline" 
                    className="flex items-center gap-1 text-xs"
                  >
                    {getPermissionIcon(permission)}
                    {permission}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Role Change Request (for demo purposes) */}
      {hasUserManagePermission && (
        <Card className="glass border-border/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Role Management
            </CardTitle>
            <CardDescription>
              Manage user roles and permissions (Admin only)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Change User Role:</label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(roleDefinitions).map(([roleKey, role]) => (
                      <SelectItem key={roleKey} value={roleKey}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={() => {
                  alert(`Role change to ${roleDefinitions[selectedRole].name} would be processed here.`);
                }}
                disabled={selectedRole === user?.role}
              >
                Update Role
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};