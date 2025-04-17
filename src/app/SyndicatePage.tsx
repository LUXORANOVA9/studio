'use client';

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SyndicatePage() {
  const [form, setForm] = useState({ name: "", description: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission logic (API call)
    setSubmitted(true);
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate API call
    setSubmitted(false);
    setForm({name: '', description: ''}); // Clear the form
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 flex flex-col items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 text-center">
            🚀 Create Investment Syndicate
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 text-center">
            Enter the details below to create your investment group.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-right">
                Syndicate Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Ex: Nova Syndicate"
                className="rounded-xl"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                placeholder="Describe your investment focus..."
                className="rounded-xl"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-semibold shadow-md transition duration-200"
            >
              Create Syndicate
            </Button>
          </form>

          {submitted && (
            <div className="mt-4 text-green-600 font-semibold text-center animate-pulse">
              ✅ Syndicate created successfully!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
