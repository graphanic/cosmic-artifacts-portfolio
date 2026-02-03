import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Rocket, Mail, Loader2 } from "lucide-react";
import { SiTwitter, SiDiscord, SiInstagram } from "react-icons/si";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "Commission Request",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/contact", formData);
      toast({
        title: "Transmission Successful",
        description: "Your message has been sent to the cosmic void. Expect a response within 24 hours.",
      });
      setFormData({ name: "", email: "", subject: "Commission Request", message: "" });
    } catch (error) {
      toast({
        title: "Transmission Failed",
        description: "Unable to send message. Please try again or use alternative contact methods.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      title: "Digital Realm",
      icon: Mail,
      value: "cosmic@artifacts.void",
      gradient: "from-primary to-secondary",
    },
    {
      title: "Cosmic Stream",
      icon: SiTwitter,
      value: "@CosmicArtifacts",
      gradient: "from-secondary to-accent",
    },
    {
      title: "Void Collective",
      icon: SiDiscord,
      value: "CosmicVoid#0001",
      gradient: "from-accent to-primary",
    },
  ];

  const socialLinks = [
    { icon: SiTwitter, label: "Twitter" },
    { icon: SiInstagram, label: "Instagram" },
    { icon: SiDiscord, label: "Discord" },
  ];

  return (
    <section id="contact" className="py-32 parallax-element">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 glow-text" data-testid="contact-title">
            INITIATE CONTACT
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="contact-description">
            Establish a quantum entanglement across the digital void
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Contact form with fractal accent overlays */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Fractal accent overlays */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-xl animate-float"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-secondary/30 to-transparent rounded-full blur-xl animate-float" style={{ animationDelay: "-3s" }}></div>

            <div className="bg-card/30 backdrop-blur-sm rounded-xl p-8 border border-border relative glow-border">
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Entity Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                      placeholder="Your cosmic designation"
                      required
                      data-testid="contact-name-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Quantum Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                      placeholder="entity@void.cosmos"
                      required
                      data-testid="contact-email-input"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Transmission Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                    data-testid="contact-subject-select"
                  >
                    <option value="Commission Request">Commission Request</option>
                    <option value="Collaboration Proposal">Collaboration Proposal</option>
                    <option value="Technical Inquiry">Technical Inquiry</option>
                    <option value="Cosmic Philosophy">Cosmic Philosophy</option>
                    <option value="Other Dimensional Matter">Other Dimensional Matter</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Dimensional Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 resize-none"
                    placeholder="Encode your thoughts into the quantum field..."
                    required
                    data-testid="contact-message-textarea"
                  ></textarea>
                </div>

                {/* Glowing call-to-action button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-4 rounded-lg text-lg font-semibold hover:scale-105 transition-all duration-300 shimmer-overlay animate-glow-pulse disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid="contact-submit-button"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      TRANSMITTING...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5" />
                      TRANSMIT TO THE VOID
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact information */}
          <motion.div
            className="mt-12 grid md:grid-cols-3 gap-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                className="bg-card/20 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-accent/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                data-testid={`contact-method-${index}`}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${method.gradient} rounded-full mx-auto mb-4 flex items-center justify-center animate-glow`}>
                  <method.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-serif font-bold text-accent mb-2">{method.title}</h4>
                <p className="text-sm text-muted-foreground">{method.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Response time indicator */}
          <motion.div
            className="text-center mt-8 p-4 bg-accent/10 border border-accent/20 rounded-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-accent font-medium" data-testid="response-time">
              Usually responds within 24 hours
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-32 pt-16 border-t border-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-serif font-bold text-accent mb-4" data-testid="footer-title">
                COSMIC ARTIFACTS
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Transcendent digital art from the intersection of technology and mysticism
              </p>
            </div>

            <div className="flex justify-center space-x-6 mb-8">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-12 h-12 bg-muted/30 rounded-full flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/20 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  data-testid={`footer-social-${index}`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            <div className="text-sm text-muted-foreground">
              <p>&copy; 2024 Cosmic Artifacts. All rights reserved across all dimensions.</p>
              <p className="mt-2 font-mono text-xs">// Powered by quantum algorithms and cosmic inspiration</p>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
