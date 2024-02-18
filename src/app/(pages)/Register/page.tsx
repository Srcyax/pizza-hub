"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { toast } from "sonner"

import { useRouter } from "next/navigation"

export default function Register(){
    const router = useRouter();

    return (
        <main className="flex flex-row justify-center items-center m-14">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-1">
                    <TabsTrigger value="account">Account</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                    <CardHeader>
                        <CardTitle>Registro</CardTitle>
                        <CardDescription>
                            Faça alterações em sua conta aqui. Clique em salvar quando terminar.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="user" placeholder="Nome" />
                        </div>
                        <div className="space-y-1">
                        <Label htmlFor="username">Endereço de entrega</Label>
                        <Input id="address" placeholder="Endereço" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={() =>
                        {
                            var user = document.getElementById("user") as HTMLInputElement;
                            var address = document.getElementById("address") as HTMLInputElement;

                            if (user.value !== "" && address.value !== ""){
                                localStorage.setItem("user", user.value);
                                localStorage.setItem("address", address.value);

                                router.push("/")
                            }
                            else{
                                toast("Erro!", {
                                    description: "Preencha os campos necessários.",
                                    action: {
                                      label: "Undo",
                                      onClick: () => console.log("Undo"),
                                    },
                                  })
                            }
                        }}>Salvar Registro</Button>
                    </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    )
}