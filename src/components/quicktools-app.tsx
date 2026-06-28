'use client';

import { useState, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Type,
  FileText,
  Braces,
  CaseSensitive,
  Key,
  Binary,
  Link,
  Palette,
  Zap,
  Globe,
  ArrowRight,
  TrendingUp,
  Users,
  Clock,
  Sparkles,
  Share2,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdSenseAd } from '@/components/adsense-ad';
import {
  toolsData,
  categories,
  getToolData,
  type ToolData,
} from '@/lib/tools-data';
import WordCounter from '@/components/tools/word-counter';
import LoremIpsum from '@/components/tools/lorem-ipsum';
import JsonFormatter from '@/components/tools/json-formatter';
import CaseConverter from '@/components/tools/case-converter';
import PasswordGenerator from '@/components/tools/password-generator';
import Base64Tool from '@/components/tools/base64-tool';
import UrlTool from '@/components/tools/url-tool';
import ColorPicker from '@/components/tools/color-picker';

const iconMap: Record<string, React.ReactNode> = {
  Type: <Type className="h-6 w-6" />,
  FileText: <FileText className="h-6 w-6" />,
  Braces: <Braces className="h-6 w-6" />,
  CaseSensitive: <CaseSensitive className="h-6 w-6" />,
  Key: <Key className="h-6 w-6" />,
  Binary: <Binary className="h-6 w-6" />,
  Link: <Link className="h-6 w-6" />,
  Palette: <Palette className="h-6 w-6" />,
};

function getToolComponent(id: string) {
  switch (id) {
    case 'word-counter': return <WordCounter />;
    case 'lorem-ipsum': return <LoremIpsum />;
    case 'json-formatter': return <JsonFormatter />;
    case 'case-converter': return <CaseConverter />;
    case 'password-generator': return <PasswordGenerator />;
    case 'base64': return <Base64Tool />;
    case 'url-encoder': return <UrlTool />;
    case 'color-picker': return <ColorPicker />;
    default: return null;
  }
}

function QuickToolsAppInner({ initialTool }: { initialTool: string | null }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentToolSlug = searchParams.get('tool') || initialTool;
  const [activeCategory, setActiveCategory] = useState('All');
  const { toast } = useToast();

  const currentTool = currentToolSlug
    ? getToolData(currentToolSlug)
    : undefined;

  const navigateToTool = useCallback(
    (slug: string | null) => {
      if (slug) {
        router.push(`/?tool=${slug}`, { scroll: false });
      } else {
        router.push('/', { scroll: false });
      }
    },
    [router]
  );

  const handleShare = useCallback(async () => {
    if (!currentTool) return;
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: 'Link copied!',
        description: `Share this tool: ${url}`,
      });
    } catch {
      toast({
        title: 'Failed to copy',
        variant: 'destructive',
      });
    }
  }, [currentTool, toast]);

  const filteredTools =
    activeCategory === 'All'
      ? toolsData
      : toolsData.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button
              onClick={() => navigateToTool(null)}
              className="flex items-center gap-2 text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <Zap className="h-5 w-5" />
              </div>
              <span>QuickTools</span>
            </button>

            {currentTool && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {currentTool.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateToTool(null)}
                  className="gap-1.5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">All Tools</span>
                </Button>
              </motion.div>
            )}

            {!currentTool && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="hidden sm:flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  8 Free Tools
                </Badge>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentTool ? (
            <motion.div
              key={currentTool.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6"
            >
              {/* Tool Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
                    {iconMap[currentTool.iconKey]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-bold tracking-tight">{currentTool.name}</h1>
                    <p className="text-sm text-muted-foreground">{currentTool.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="gap-1.5 shrink-0"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                </div>
                {/* Breadcrumb URL */}
                <p className="text-xs text-muted-foreground mt-1 font-mono">
                  quicktools.vercel.app/?tool={currentTool.slug}
                </p>
              </div>

              {/* Top Banner Ad */}
              <div className="mb-6">
                <AdSenseAd adSlot="top-banner" adFormat="horizontal" className="w-full" style={{ display: 'block', minHeight: '90px' }} />
              </div>

              {/* Tool Content with Sidebar Ad Layout */}
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 min-w-0">
                  {getToolComponent(currentTool.id)}
                </div>

                {/* Sidebar Ads - Desktop Only */}
                <div className="hidden lg:block w-[300px] shrink-0">
                  <div className="sticky top-24 space-y-6">
                    <AdSenseAd adSlot="sidebar-1" adFormat="rectangle" style={{ display: 'block', minHeight: '250px' }} />
                    <AdSenseAd adSlot="sidebar-2" adFormat="rectangle" style={{ display: 'block', minHeight: '250px' }} />
                  </div>
                </div>
              </div>

              {/* Mobile Ad - Bottom */}
              <div className="mt-6 lg:hidden">
                <AdSenseAd adSlot="mobile-bottom" adFormat="horizontal" className="w-full" style={{ display: 'block', minHeight: '100px' }} />
              </div>

              {/* Related Tools */}
              <div className="mt-10">
                <h2 className="text-lg font-semibold mb-4">Related Tools</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {toolsData
                    .filter((t) => t.id !== currentTool.id && t.category === currentTool.category)
                    .slice(0, 4)
                    .map((tool) => (
                      <Card
                        key={tool.id}
                        className="group cursor-pointer hover:border-emerald-300 dark:hover:border-emerald-700 transition-all"
                        onClick={() => navigateToTool(tool.slug)}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
                            {iconMap[tool.iconKey]}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                              {tool.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{tool.searchVolume} searches</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Hero Section */}
              <section className="relative overflow-hidden border-b">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-transparent to-teal-50 dark:from-emerald-950/30 dark:via-transparent dark:to-teal-950/20" />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                  <div className="text-center max-w-3xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/50 dark:text-emerald-400 border-0">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Free Online Tools — No Signup Required
                      </Badge>
                    </motion.div>
                    <motion.h1
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
                    >
                      Simple Tools That{' '}
                      <span className="text-emerald-600 dark:text-emerald-400">Save Time</span>
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                    >
                      A collection of fast, free, and privacy-friendly online tools for developers,
                      designers, and content creators. No ads, no tracking, no nonsense.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground"
                    >
                      <div className="flex items-center gap-1.5">
                        <Zap className="h-4 w-4 text-emerald-600" />
                        8 Free Tools
                      </div>
                      <Separator orientation="vertical" className="h-4" />
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-emerald-600" />
                        Instant Results
                      </div>
                      <Separator orientation="vertical" className="h-4" />
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-emerald-600" />
                        3M+ Monthly Searches
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Stats Bar */}
              <section className="border-b bg-muted/30">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="flex items-center justify-center gap-1.5 text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                        <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7" />
                        3.3M+
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Monthly Search Volume</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1.5 text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                        <Users className="h-6 w-6 sm:h-7 sm:w-7" />
                        100%
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Free to Use</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1.5 text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                        <Zap className="h-6 w-6 sm:h-7 sm:w-7" />
                        0ms
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Server Processing</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1.5 text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                        <Globe className="h-6 w-6 sm:h-7 sm:w-7" />
                        All Data
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Processed Locally</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Tools Section */}
              <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Category Filter */}
                <div className="flex flex-wrap items-center gap-2 mb-8">
                  <span className="text-sm font-medium text-muted-foreground mr-2">Filter:</span>
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      variant={activeCategory === cat ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveCategory(cat)}
                      className={
                        activeCategory === cat
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : ''
                      }
                    >
                      {cat}
                    </Button>
                  ))}
                </div>

                {/* Tool Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredTools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Card
                        className="group cursor-pointer h-full hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md hover:shadow-emerald-100 dark:hover:shadow-emerald-950/50 transition-all duration-200"
                        onClick={() => navigateToTool(tool.slug)}
                      >
                        <CardContent className="p-5 sm:p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/80 transition-colors">
                              {iconMap[tool.iconKey]}
                            </div>
                            <Badge variant="secondary" className="text-xs font-normal">
                              {tool.category}
                            </Badge>
                          </div>
                          <h3 className="font-semibold mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                            {tool.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {tool.searchVolume} searches
                            </span>
                            <span className="text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-sm font-medium">
                              Open
                              <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Banner Ad */}
                <div className="mt-12">
                  <div className="max-w-4xl mx-auto">
                    <AdSenseAd adSlot="bottom-banner" adFormat="horizontal" className="w-full" style={{ display: 'block', minHeight: '90px' }} />
                  </div>
                </div>
              </section>

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Sticky Footer */}
      <footer className="border-t bg-muted/30 mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600 text-white">
                  <Zap className="h-4 w-4" />
                </div>
                <span className="font-bold">QuickTools</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Free online tools for developers, designers, and content creators. No signup, no tracking, no nonsense.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Text Tools</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => navigateToTool('word-counter')} className="hover:text-foreground transition-colors">Word Counter</button></li>
                <li><button onClick={() => navigateToTool('lorem-ipsum-generator')} className="hover:text-foreground transition-colors">Lorem Ipsum Generator</button></li>
                <li><button onClick={() => navigateToTool('case-converter')} className="hover:text-foreground transition-colors">Case Converter</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Developer Tools</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => navigateToTool('json-formatter')} className="hover:text-foreground transition-colors">JSON Formatter</button></li>
                <li><button onClick={() => navigateToTool('base64-encoder-decoder')} className="hover:text-foreground transition-colors">Base64 Encoder/Decoder</button></li>
                <li><button onClick={() => navigateToTool('url-encoder-decoder')} className="hover:text-foreground transition-colors">URL Encoder/Decoder</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Other Tools</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => navigateToTool('password-generator')} className="hover:text-foreground transition-colors">Password Generator</button></li>
                <li><button onClick={() => navigateToTool('color-picker-converter')} className="hover:text-foreground transition-colors">Color Picker</button></li>
              </ul>
            </div>
          </div>
          <Separator className="mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} QuickTools. All tools run 100% in your browser.</p>
            <p>
              Built with{' '}
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Next.js</span>{' '}
              +{' '}
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">shadcn/ui</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function QuickToolsApp({ initialTool }: { initialTool: string | null }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Zap className="h-6 w-6 animate-pulse text-emerald-600" />
            <span>Loading QuickTools...</span>
          </div>
        </div>
      }
    >
      <QuickToolsAppInner initialTool={initialTool} />
    </Suspense>
  );
}