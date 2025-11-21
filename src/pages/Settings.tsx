import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useThemeStore } from '@/store/useThemeStore';
import { Sun, Moon, Info, AlertTriangle } from 'lucide-react';

const Settings: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Customize your PEDS MASTER experience</p>
      </div>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Choose between light and dark mode</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isDarkMode ? (
                <Moon className="h-5 w-5 text-primary" />
              ) : (
                <Sun className="h-5 w-5 text-primary" />
              )}
              <span className="font-medium">
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>
            <Button onClick={toggleTheme} variant="outline">
              {isDarkMode ? (
                <>
                  <Sun className="h-4 w-4 mr-2" />
                  Switch to Light
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 mr-2" />
                  Switch to Dark
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-primary" />
            <CardTitle>About PEDS MASTER</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Mission</h3>
            <p className="text-sm text-muted-foreground">
              PEDS MASTER is an interactive pediatric learning platform designed to teach rapid recognition of pediatric emergencies, outpatient pediatrics reasoning, growth and development logic, and case-based pediatric reasoning.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Features</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Comprehensive coverage of high-yield pediatric conditions</li>
              <li>Interactive diagnostic tools and assessments</li>
              <li>Clinical case scenarios for practical learning</li>
              <li>Mobile-first, responsive design</li>
              <li>Dark mode optimized for comfortable viewing</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Topics Covered</h3>
            <p className="text-sm text-muted-foreground">
              Neonatal sepsis, congenital heart disease (ASD, VSD, PDA), bronchiolitis (RSV), croup vs epiglottitis, otitis media, strep pharyngitis, failure to thrive, childhood asthma, pediatric dehydration and fluids, and developmental delay.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Version</h3>
            <p className="text-sm text-muted-foreground">PEDS MASTER v1.0.0</p>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimers */}
      <Card className="border-destructive/50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">Important Disclaimers</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Educational Use Only</h3>
            <p className="text-muted-foreground">
              This platform is designed exclusively for educational purposes. It is intended for medical students, residents, and healthcare professionals as a learning tool to enhance their understanding of pediatric medicine.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Not for Clinical Decision-Making</h3>
            <p className="text-muted-foreground">
              PEDS MASTER is NOT intended for use in clinical decision-making, patient care, or diagnosis. All clinical decisions should be made by qualified healthcare professionals based on individual patient circumstances and current clinical guidelines.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Synthetic Data</h3>
            <p className="text-muted-foreground">
              All case scenarios, patient data, and clinical examples presented in this platform are entirely synthetic and created for educational purposes. Any resemblance to real patients or cases is purely coincidental.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">No Medication Dosing</h3>
            <p className="text-muted-foreground">
              This platform does not provide specific medication dosages. Always refer to current prescribing information, clinical guidelines, and consult with experienced clinicians for medication management.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Guidelines and References</h3>
            <p className="text-muted-foreground">
              While this platform aligns with AAP (American Academy of Pediatrics) conceptual frameworks and evidence-based practices, it should not replace consultation of primary literature, current clinical guidelines, or expert consultation.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Liability</h3>
            <p className="text-muted-foreground">
              The creators and maintainers of PEDS MASTER assume no liability for any decisions made based on information provided in this platform. Users are responsible for verifying all information and using appropriate clinical judgment.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
