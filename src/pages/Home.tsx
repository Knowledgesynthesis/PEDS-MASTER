import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import {
  Baby,
  Heart,
  Wind,
  Ear,
  TrendingDown,
  Activity,
  Droplet,
  Brain,
  FileText,
  ClipboardCheck,
  AlertCircle
} from 'lucide-react';

const Home: React.FC = () => {
  const modules = [
    {
      path: '/neonatal-sepsis',
      icon: Baby,
      title: 'Neonatal Sepsis',
      description: 'Early vs late onset sepsis, risk factors, and evaluation',
      color: 'text-red-500'
    },
    {
      path: '/chd',
      icon: Heart,
      title: 'Congenital Heart Disease',
      description: 'ASD, VSD, PDA - murmurs and physiology',
      color: 'text-pink-500'
    },
    {
      path: '/bronchiolitis',
      icon: Wind,
      title: 'Bronchiolitis (RSV)',
      description: 'Viral pathophysiology and supportive management',
      color: 'text-blue-500'
    },
    {
      path: '/croup',
      icon: AlertCircle,
      title: 'Airway Emergencies',
      description: 'Croup vs epiglottitis differentiation',
      color: 'text-orange-500'
    },
    {
      path: '/ent',
      icon: Ear,
      title: 'ENT & Throat Infections',
      description: 'Otitis media, strep pharyngitis, and complications',
      color: 'text-purple-500'
    },
    {
      path: '/ftt',
      icon: TrendingDown,
      title: 'Failure to Thrive',
      description: 'Growth patterns and differential diagnosis',
      color: 'text-yellow-600'
    },
    {
      path: '/asthma',
      icon: Activity,
      title: 'Childhood Asthma',
      description: 'Classification and step-up/down therapy',
      color: 'text-green-500'
    },
    {
      path: '/fluids',
      icon: Droplet,
      title: 'Pediatric Fluids',
      description: 'Dehydration assessment and fluid management',
      color: 'text-cyan-500'
    },
    {
      path: '/development',
      icon: Brain,
      title: 'Developmental Delay',
      description: 'Milestones and red flags by domain',
      color: 'text-indigo-500'
    },
    {
      path: '/cases',
      icon: FileText,
      title: 'Clinical Cases',
      description: 'Interactive pediatric case scenarios',
      color: 'text-teal-500'
    },
    {
      path: '/assessment',
      icon: ClipboardCheck,
      title: 'Assessment',
      description: 'Test your knowledge with MCQs and vignettes',
      color: 'text-violet-500'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Welcome to PEDS MASTER
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive pediatric educational platform covering high-yield ambulatory and emergency conditions
        </p>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <Link key={module.path} to={module.path}>
              <Card className="h-full transition-all hover:shadow-lg hover:scale-105 cursor-pointer">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className={`${module.color} p-2 bg-secondary rounded-lg`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Info */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">Educational Platform</CardTitle>
          <CardDescription className="space-y-2">
            <p>This platform is designed for medical students, residents, and healthcare professionals to learn pediatric diagnosis and management.</p>
            <p className="font-semibold text-destructive">
              For educational purposes only. Not intended for clinical decision-making.
            </p>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Home;
