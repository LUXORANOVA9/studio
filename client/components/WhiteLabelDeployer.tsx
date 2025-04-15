'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';

const WhiteLabelDeployer: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data: any) => {
        setError(null);
        try {
            // Simulate white-label deployment process
            console.log('White-label deployment data:', data);
            // In a real application, you would send this data to your backend
            // to create a new white-labeled instance of your application.
            alert('White-label deployment initiated! Check the console for details.');
            router.push('/superadmin'); // Redirect to superadmin dashboard
        } catch (e: any) {
            console.error('White-label deployment failed:', e);
            setError(e.message);
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>White-Label Deployment</CardTitle>
            </CardHeader>
            <CardContent>
                {error && <div className="text-red-500">{error}</div>}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="brandName">Brand Name</Label>
                        <Input
                            id="brandName"
                            type="text"
                            {...register('brandName', { required: 'Brand name is required' })}
                            className="w-full"
                        />
                        {errors.brandName && <p className="text-red-500">{errors.brandName.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="language">Language</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a language" {...register('language', { required: 'Language is required' })} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="es">Spanish</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                                {/* Add more languages as needed */}
                            </SelectContent>
                        </Select>
                        {errors.language && <p className="text-red-500">{errors.language.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="taxRules">Tax Rules</Label>
                        <Textarea
                            id="taxRules"
                            {...register('taxRules', { required: 'Tax rules are required' })}
                            className="w-full"
                        />
                        {errors.taxRules && <p className="text-red-500">{errors.taxRules.message}</p>}
                    </div>
                    <Button type="submit" className="w-full">
                        Deploy White-Label Instance
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default WhiteLabelDeployer;

    
