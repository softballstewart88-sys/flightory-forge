import { Cpu, Cog, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Cpu,
    title: "3D-Printed Precision",
    description: "Every component engineered for optimal aerodynamics and durability using advanced additive manufacturing."
  },
  {
    icon: Cog,
    title: "Modular Design",
    description: "Easily customize and upgrade your drone with interchangeable parts. Built for enthusiasts who demand flexibility."
  },
  {
    icon: Zap,
    title: "Flight-Ready Kits",
    description: "Complete kits with everything you need. From hobbyist builds to professional applications."
  }
];

export const Features = () => {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16">
          Why 3D-Printed Drones?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="card-gradient hover-lift border-border">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center glow-effect">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
