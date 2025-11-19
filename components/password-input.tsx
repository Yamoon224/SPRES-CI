import { useState, ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
    t: (key: string) => string;
    formData: {
        password: string;
    };
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput({ t, formData, handleInputChange }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-foreground mb-2">
                {t("auth.password")}
            </label>

            {/* Conteneur flex pour aligner l'input et le bouton */}
            <div className="relative flex items-center">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-gray-500 hover:text-gray-700 flex items-center justify-center"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
    );
}
