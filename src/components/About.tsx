import { Card, CardContent } from "@/components/ui/card";

export const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="card-gradient border-border">
            <CardContent className="p-12">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 text-center">
                Made in Ohio. Built for Flight.
              </h2>
              
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  Flightory Drones is pioneering the future of drone manufacturing in Ohio. 
                  We leverage cutting-edge 3D printing technology to create high-performance 
                  drone kits that rival traditional manufacturing methods.
                </p>
                
                <p>
                  Our mission is to make advanced aerospace technology accessible to hobbyists, 
                  educators, and professionals. Every drone kit is designed with precision 
                  engineering and tested to ensure optimal flight performance.
                </p>
                
                <p>
                  From STEM education to professional applications, our drones are built to 
                  inspire innovation and push the boundaries of what's possible with additive 
                  manufacturing.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
