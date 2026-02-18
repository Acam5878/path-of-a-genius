import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, Crown, Clock, Bell, Palette, Shield, HelpCircle, Info,
  ChevronRight, LogOut, Mail, Star, Trash2, ExternalLink, Check, Type
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/contexts/AuthContext';
import { openAppStoreSubscriptions } from '@/lib/externalLinks';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type FontSize = 'small' | 'medium' | 'large';

const FONT_SIZE_KEY = 'genius-academy-font-size';

const applyFontSize = (size: FontSize) => {
  const root = document.documentElement;
  if (size === 'small') root.style.fontSize = '14px';
  else if (size === 'large') root.style.fontSize = '18px';
  else root.style.fontSize = '16px';
  localStorage.setItem(FONT_SIZE_KEY, size);
};
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
  const { subscription, isPremium, showPaywall, restorePurchases } = useSubscription();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [displayName, setDisplayName] = useState(user?.user_metadata?.display_name || '');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>(() => (localStorage.getItem(FONT_SIZE_KEY) as FontSize) || 'medium');

  useEffect(() => {
    applyFontSize(fontSize);
  }, [fontSize]);

  const handleFontSizeChange = (size: FontSize) => {
    setFontSize(size);
    applyFontSize(size);
    toast.success(`Text size set to ${size}`);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSavingProfile(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { display_name: displayName }
      });
      
      if (error) {
        console.error('Update profile error:', error);
        toast.error('Failed to update profile');
        return;
      }
      
      // Also update the profiles table if it exists
      await supabase
        .from('profiles')
        .update({ display_name: displayName })
        .eq('user_id', user.id);
      
      toast.success('Profile updated!');
      setShowEditProfile(false);
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleSignOut = async () => {
    // Clear all local storage to prevent stale session data
    localStorage.clear();
    await signOut();
    toast.success('Signed out successfully');
    navigate('/auth');
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    
    setIsDeleting(true);
    try {
      const { data, error } = await supabase.functions.invoke('delete-account');
      
      if (error) {
        console.error('Delete account error:', error);
        toast.error('Failed to delete account. Please try again.');
        return;
      }

      // Clear local storage
      localStorage.clear();
      
      // Sign out and redirect
      await signOut();
      toast.success('Your account has been deleted');
      navigate('/auth');
    } catch (error) {
      console.error('Delete account error:', error);
      toast.error('Failed to delete account. Please contact support.');
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const getPlanLabel = () => {
    if (subscription.tier === 'lifetime') return 'LIFETIME';
    if (subscription.tier === 'monthly') return 'PREMIUM';
    return 'FREE PLAN';
  };

  const getPlanDescription = () => {
    if (isPremium) {
      return subscription.tier === 'lifetime' 
        ? 'Full access to all content forever'
        : 'Full access to all 10 geniuses';
    }
    return '1/10 geniuses unlocked • Upgrade for full access';
  };

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
                <span className="text-2xl font-heading text-cream">
                  {user?.email?.charAt(0).toUpperCase() || 'G'}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="font-heading text-lg font-semibold text-foreground">
                  {user?.user_metadata?.display_name || 'Scholar'}
                </h2>
                <p className="text-sm text-muted-foreground">{user?.email || 'Guest'}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {user ? `Member since ${new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : 'Not signed in'}
                </p>
              </div>
            </div>
            {user ? (
              <Button 
                onClick={() => {
                  console.log('Edit Profile tapped');
                  setShowEditProfile(true);
                }}
                type="button"
                className="w-full mt-4 bg-muted text-foreground hover:bg-muted/80 cursor-pointer touch-manipulation"
              >
                Edit Profile
              </Button>
            ) : (
              <Button 
                onClick={() => navigate('/auth')}
                className="w-full mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                Sign In
              </Button>
            )}
          </div>
        </motion.div>

        {/* Subscription Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-4 mb-6"
        >
          <div className={cn(
            "rounded-2xl p-4",
            isPremium ? "bg-secondary/10 border border-secondary/30" : "gradient-premium text-cream"
          )}>
            <div className="flex items-center gap-2 mb-2">
              <Crown className={cn("w-5 h-5", isPremium && "text-secondary")} />
              <span className={cn("text-xs font-mono", isPremium ? "text-secondary" : "text-cream")}>
                {getPlanLabel()}
              </span>
              {isPremium && <Check className="w-4 h-4 text-secondary ml-auto" />}
            </div>
            <h3 className={cn("font-heading text-lg font-semibold", isPremium ? "text-foreground" : "text-cream")}>
              {isPremium ? 'Premium Member' : 'Upgrade to Premium'}
            </h3>
            <p className={cn("text-sm mt-1", isPremium ? "text-muted-foreground" : "text-cream/80")}>
              {getPlanDescription()}
            </p>
            
            <div className="flex flex-col gap-2 mt-4">
              {isPremium ? (
                <>
                  <Button 
                    onClick={openAppStoreSubscriptions}
                    className="w-full bg-muted text-foreground hover:bg-muted/80"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Manage Subscription
                  </Button>
                  {subscription.tier === 'monthly' && subscription.expiresAt && (
                    <p className="text-xs text-muted-foreground text-center">
                      Renews {new Date(subscription.expiresAt).toLocaleDateString()}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <Button 
                    onClick={showPaywall}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-gold-light"
                  >
                    View Plans
                  </Button>
                  <button
                    onClick={restorePurchases}
                    className="text-xs text-center text-cream/70 hover:text-cream transition-colors"
                  >
                    Restore Purchases
                  </button>
                </>
              )}
            </div>
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
          {/* Font Size Picker - inline custom row */}
          <div className="flex items-center gap-3 p-3">
            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <Type className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Text Size</p>
              <div className="flex gap-2 mt-1.5">
                {(['small', 'medium', 'large'] as FontSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => handleFontSizeChange(size)}
                    className={cn(
                      "px-3 py-1 rounded-lg text-xs font-medium border transition-colors capitalize",
                      fontSize === size
                        ? "bg-secondary text-secondary-foreground border-secondary"
                        : "bg-muted text-muted-foreground border-border hover:border-secondary/50"
                    )}
                  >
                    {size === 'small' ? 'A' : size === 'medium' ? 'Aa' : 'Aaa'}
                  </button>
                ))}
              </div>
            </div>
          </div>
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
          <SettingItem 
            icon={HelpCircle} 
            label="Help Center" 
            onClick={() => navigate('/support')}
          />
          <SettingItem 
            icon={Mail} 
            label="Contact Support" 
            onClick={() => window.location.href = 'mailto:support@pathofagenius.com'}
          />
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
          <SettingItem 
            icon={Shield} 
            label="Terms of Service" 
            onClick={() => navigate('/terms')}
          />
          <SettingItem 
            icon={Shield} 
            label="Privacy Policy" 
            onClick={() => navigate('/privacy')}
          />
        </SettingsSection>

        {/* Danger Zone */}
        <div className="mx-4 space-y-2 mb-8">
          {user ? (
            <>
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setShowDeleteDialog(true)}
                className="w-full text-destructive/70 hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => navigate('/auth')}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Sign In to Sync Progress
            </Button>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground px-4 pb-4">
          <p>Made with ❤️ for lifelong learners</p>
          <p className="mt-1">© 2026 Path of a Genius</p>
        </div>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove all your data including:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Your learning progress</li>
                <li>Study sessions and streaks</li>
                <li>Achievements earned</li>
                <li>Profile information</li>
              </ul>
              <p className="mt-3 font-medium">
                Note: If you have an active subscription, please cancel it first in the App Store
                to avoid future charges.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete Account'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Profile Dialog */}
      <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
        <DialogContent className="sm:max-w-md z-[9999]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={user?.email || ''}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEditProfile(false)}
              disabled={isSavingProfile}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveProfile}
              disabled={isSavingProfile}
              className="bg-secondary text-secondary-foreground"
            >
              {isSavingProfile ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Settings;
