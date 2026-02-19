import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, X } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { GeniusCard } from '@/components/cards/GeniusCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { geniuses } from '@/data/geniuses';


const fields = ['All', 'Philosophy', 'Physics', 'Mathematics', 'Arts', 'Engineering', 'Chemistry', 'Literature'];
const eras = ['All', 'Ancient', 'Renaissance', 'Enlightenment', 'Modern'];

const Geniuses = () => {
  // Preload GeniusProfile chunk on mount so navigation feels instant
  useEffect(() => {
    const timer = setTimeout(() => import('./GeniusProfile'), 300);
    return () => clearTimeout(timer);
  }, []);
  const [selectedField, setSelectedField] = useState('All');
  const [selectedEra, setSelectedEra] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredGeniuses = geniuses.filter(g => {
    const matchesField = selectedField === 'All' || g.field.includes(selectedField);
    const matchesEra = selectedEra === 'All' || g.era === selectedEra;
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         g.field.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesField && matchesEra && matchesSearch;
  });

  return (
    <AppLayout>
      <Header 
        title="Geniuses"
        rightActions={
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        }
      />

      <div className="px-4 py-4 space-y-4">
        {/* Hero — anti-scroll brand, no premium mentions */}
        <div className="text-center py-3">
          <p className="font-heading text-xl font-bold text-foreground">10 minds who changed the world.</p>
          <p className="text-sm text-muted-foreground mt-1">Each one studied the same foundations. Now you can too.</p>
        </div>
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search geniuses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setSearchQuery('')}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-3"
            >
              <div>
                <p className="text-xs text-muted-foreground mb-2">Field</p>
                <div className="flex flex-wrap gap-2">
                  {fields.map(field => (
                    <Button
                      key={field}
                      variant={selectedField === field ? 'default' : 'outline'}
                      size="sm"
                      className={selectedField === field 
                        ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90 h-7 text-xs' 
                        : 'h-7 text-xs border-border'}
                      onClick={() => setSelectedField(field)}
                    >
                      {field}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Era</p>
                <div className="flex flex-wrap gap-2">
                  {eras.map(era => (
                    <Button
                      key={era}
                      variant={selectedEra === era ? 'default' : 'outline'}
                      size="sm"
                      className={selectedEra === era 
                        ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90 h-7 text-xs' 
                        : 'h-7 text-xs border-border'}
                      onClick={() => setSelectedEra(era)}
                    >
                      {era}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredGeniuses.length} genius{filteredGeniuses.length !== 1 ? 'es' : ''} found
          </p>
          {(selectedField !== 'All' || selectedEra !== 'All') && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-secondary"
              onClick={() => { setSelectedField('All'); setSelectedEra('All'); }}
            >
              Clear filters
            </Button>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredGeniuses.map((genius, i) => (
            <motion.div
              key={genius.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <GeniusCard genius={genius} />
            </motion.div>
          ))}
        </div>

        {filteredGeniuses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No geniuses match your filters</p>
            <Button
              variant="link"
              className="text-secondary mt-2"
              onClick={() => { setSelectedField('All'); setSelectedEra('All'); setSearchQuery(''); }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Geniuses;
