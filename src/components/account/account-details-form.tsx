"use client";
import React, { use } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@/app/actions/auth/types";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";

const roles = ["Admin", "Editor", "Viewer"];

const formSchema = z.object({
  name: z.string().min(1, "First name is required"),
  email: z.email("Invalid email address"),
  role: z.enum(roles),
  username: z.string().min(1, "Username is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function AccountDetailsForm({ user }: { user: User }) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      username: user.username,
      role: "Viewer",
    },
  });

  // console.log({ data: form.getValues(), errord: form.formState.errors });

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              console.log(data);
            })}
          >
            <h2 className="mb-6">Profile Details</h2>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="firstName" className=" mb-2 block">
                      Name
                    </FormLabel>
                    <Input id="name" {...field} className="w-full" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username" className=" mb-2 block">
                      Username
                    </FormLabel>
                    <Input
                      id="username"
                      {...field}
                      className="w-full"
                      disabled
                    />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email" className=" mb-2 block">
                      Email
                    </FormLabel>
                    <Input id="email" {...field} className="w-full" disabled />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="role" className="mb-2 block">
                      Role
                    </FormLabel>
                    <Input id="role" {...field} className="w-full" disabled />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button className="" disabled>
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
