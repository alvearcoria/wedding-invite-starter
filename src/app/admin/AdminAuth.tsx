
'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { siteConfig } from '@/config/site';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';

const AUTH_KEY = `admin_auth_token_${siteConfig.slug}`;

export function AdminAuth({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(AUTH_KEY);
      if (storedToken === siteConfig.adminPassword) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Could not access localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === siteConfig.adminPassword) {
      try {
        localStorage.setItem(AUTH_KEY, password);
        setIsAuthenticated(true);
        toast({ title: "Acceso concedido", description: "¡Bienvenido/a!" });
      } catch (error) {
         console.error("Could not write to localStorage", error);
         toast({
            variant: "destructive",
            title: "Error de Navegador",
            description: "No se pudo guardar la sesión. El modo incógnito puede causar esto.",
        });
        // Allow session to proceed without storing token if localStorage fails
        setIsAuthenticated(true);
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Acceso Denegado',
        description: 'La contraseña es incorrecta.',
      });
      setPassword('');
    }
  };
  
  const handleLogout = () => {
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (error) {
      console.error("Could not clear localStorage", error);
    }
    setIsAuthenticated(false);
    setPassword('');
    toast({ title: "Sesión cerrada" });
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Icon name="loader-circle" className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Acceso Restringido</CardTitle>
            <CardDescription>
              Por favor, introduce la contraseña para ver el panel de administración.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {children}
      <div className="mt-8 flex justify-center">
        <Button variant="outline" onClick={handleLogout}>
          <Icon name="loader-circle" className="mr-2" />
          Cerrar Sesión del Panel
        </Button>
      </div>
    </>
  );
}
