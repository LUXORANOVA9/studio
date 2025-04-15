'use client';

import React from 'react';
import Dashboard from '../components/Dashboard';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

const courses = [
    {
        id: 1,
        title: 'Passive Income 101',
        description: 'Learn the basics of passive income strategies.',
        progress: 50,
    },
    {
        id: 2,
        title: 'Automated Trading Mastery',
        description: 'Master futures and derivatives trading.',
        progress: 75,
    },
    {
        id: 3,
        title: 'Fintech Empire Building',
        description: 'Build your own SaaS empire with tokenomics.',
        progress: 25,
    },
    {
        id: 4,
        title: 'ScrollDAO & Governance Training',
        description: 'Learn about DAO governance and participate in ScrollDAO.',
        progress: 0,
    },
];

const AcademyPage: React.FC = () => {
    return (
        <Dashboard>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>LuxoraNova Academy</CardTitle>
                    <CardDescription>Learn and earn rewards by completing our courses!</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <ScrollArea className="h-[400px] w-full rounded-md border">
                        <div className="p-4">
                            {courses.map(course => (
                                <Card key={course.id} className="mb-4">
                                    <CardHeader>
                                        <CardTitle>{course.title}</CardTitle>
                                        <CardDescription>{course.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-between">
                                        <div className="text-sm">Progress: {course.progress}%</div>
                                        <Button>Continue Learning</Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                    <div className="flex items-center space-x-2">
                        <Avatar>
                            <AvatarImage src="https://picsum.photos/500/500" alt="Avatar" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium">Welcome, User!</p>
                            <p className="text-xs text-muted-foreground">Complete courses to earn rewards.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Dashboard>
    );
};

export default AcademyPage;
