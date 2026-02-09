import logo from '../assets/2.svg';
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            id="contacts"
            className="border-t border-blue-100 bg-blue-600 text-blue-50 transition-colors dark:border-blue-800 dark:bg-blue-950/90 dark:text-blue-200"
        >
            <div className="container mx-auto px-4 py-12 md:px-6">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-24">

                    <div className="space-y-4">
                        <a href="#" className="flex items-center gap-2">
                            <img src={logo} alt="SIEG Marketplace" className="h-10 w-auto brightness-0 invert" />
                        </a>
                        <p className="text-sm leading-relaxed opacity-80">
                            The best marketplace for those seeking innovation and efficiency.
                            Sieg Marketplace: connecting you to the best solutions.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" aria-label="Facebook" className="hover:text-white transition-colors">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">Contato</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-sm">
                                <Mail size={18} className="text-blue-200" />
                                <a href="mailto:contato@sieg.com" className="hover:underline">contato@sieg.com</a>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Phone size={18} className="text-blue-200" />
                                <a href="tel:+5511999999999" className="hover:underline">(11) 99999-9999</a>
                            </li>
                            <li className="flex items-start gap-3 text-sm italic opacity-70">
                                Customer service hours: Monday to Friday, 9 AM to 6 PM
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">Address</h3>
                        <div className="flex items-start gap-3 text-sm">
                            <MapPin size={18} className="text-blue-200 flex-shrink-0" />
                            <address className="not-italic leading-relaxed">
                                Av. Doutor Cardoso de Melo, nº 1.450 - Room 501<br />
                                Vila Olimpia neighborhood – São Paulo/SP<br />
                                Zip Code: 04548-005
                            </address>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-blue-500/30 pt-8 text-center text-xs opacity-60">
                    <p>© {currentYear} Sieg Marketplace. All rights reserved.</p>
                    <div className="mt-2 flex justify-center gap-4">
                        <a href="#" className="hover:underline">Privacy</a>
                        <a href="#" className="hover:underline">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}