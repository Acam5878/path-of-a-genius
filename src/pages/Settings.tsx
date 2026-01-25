import { motion } from 'framer-motion';
import { 
  User, Crown, Clock, Bell, Palette, Shield, HelpCircle, Info,
  ChevronRight, LogOut, Mail, Star, Trash2
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface SettingItemProps {
  icon: React.ElementType;
  label: string;
  description?: string;
  action?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

const SettingItem = ({ icon: Icon, label, description, action, onClick, danger }: SettingItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 p-3 rounded-xl transition-colors",
      "hover:bg-muted/50",
      danger && "text-destructive"
    )}
  >
    <div className={cn(
      "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
      danger ? "bg-destructive/10" : "bg-muted"
    )}>
      <Icon className="w-4 h-4" />
    </div>
    <div className="flex-1 text-left">
      <p className={cn("text-sm font-medium", danger ? "text-destructive" : "text-foreground")}>{label}</p>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
    {action || <ChevronRight className="w-4 h-4 text-muted-foreground" />}
  </button>
);

const SettingsSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-2">{title}</h3>
    <div className="bg-card rounded-xl border border-border mx-4 overflow-hidden divide-y divide-border">
      {children}
    </div>
  </div>
);

const Settings = () => {
  return (
    <AppLayout>
      <Header title="Settings" />

      <div className="py-4">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mb-6"
        >
          <div className="bg-card rounded-2xl border border-border p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center">
                <span className="text-2xl font-heading text-cream">A</span>
              </div>
              <div className="flex-1">
                <h2 className="font-heading text-lg font-semibold text-foreground">Alex Scholar</h2>
                <p className="text-sm text-muted-foreground">alex@example.com</p>
                <p className="text-xs text-muted-foreground mt-1">Member since Jan 2025</p>
              </div>
            </div>
            <Button className="w-full mt-4 bg-muted text-foreground hover:bg-muted/80">
              Edit Profile
            </Button>
          </div>
        </motion.div>

        {/* Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-4 mb-6"
        >
          <div className="gradient-premium rounded-2xl p-4 text-cream">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5" />
              <span className="text-xs font-mono">FREE PLAN</span>
            </div>
            <h3 className="font-heading text-lg font-semibold">Upgrade to Premium</h3>
            <p className="text-sm text-cream/80 mt-1">3/10 geniuses unlocked • 5/5 subjects tracked</p>
            <Button className="w-full mt-4 bg-secondary text-secondary-foreground hover:bg-gold-light">
              View Plans
            </Button>
          </div>
        </motion.div>

        {/* Study Preferences */}
        <SettingsSection title="Study Preferences">
          <SettingItem 
            icon={Clock} 
            label="Daily Goal" 
            description="1 hour per day"
          />
          <SettingItem 
            icon={Bell} 
            label="Study Reminders" 
            action={<Switch defaultChecked />}
          />
          <SettingItem 
            icon={Clock} 
            label="Session Duration" 
            description="25 minutes"
          />
        </SettingsSection>

        {/* Appearance */}
        <SettingsSection title="Appearance">
          <SettingItem 
            icon={Palette} 
            label="Theme" 
            description="Light"
          />
          <SettingItem 
            icon={Info} 
            label="Text Size" 
            description="Medium"
          />
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection title="Notifications">
          <SettingItem 
            icon={Bell} 
            label="Push Notifications" 
            action={<Switch defaultChecked />}
          />
          <SettingItem 
            icon={Mail} 
            label="Weekly Summary" 
            action={<Switch defaultChecked />}
          />
          <SettingItem 
            icon={Star} 
            label="Achievement Alerts" 
            action={<Switch defaultChecked />}
          />
        </SettingsSection>

        {/* Privacy */}
        <SettingsSection title="Privacy">
          <SettingItem 
            icon={User} 
            label="Profile Visibility" 
            description="Public"
          />
          <SettingItem 
            icon={Shield} 
            label="Data & Privacy" 
          />
        </SettingsSection>

        {/* Support */}
        <SettingsSection title="Support">
          <SettingItem icon={HelpCircle} label="Help Center" />
          <SettingItem icon={Mail} label="Contact Support" />
          <SettingItem icon={Star} label="Rate App" />
        </SettingsSection>

        {/* About */}
        <SettingsSection title="About">
          <SettingItem 
            icon={Info} 
            label="Version" 
            description="1.0.0"
            action={<span className="text-xs text-muted-foreground">1.0.0</span>}
          />
          <SettingItem icon={Shield} label="Terms of Service" />
          <SettingItem icon={Shield} label="Privacy Policy" />
        </SettingsSection>

        {/* Danger Zone */}
        <div className="mx-4 space-y-2 mb-8">
          <Button 
            variant="outline" 
            className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
          <Button 
            variant="ghost" 
            className="w-full text-destructive/70 hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground px-4 pb-4">
          <p>Made with ❤️ for lifelong learners</p>
          <p className="mt-1">© 2025 Genius Academy</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
