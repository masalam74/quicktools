'use client';

import { useState } from 'react';
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
  Wrench,
} from 'lucide-react';
import WordCounter from '@/components/tools/word-counter';
import LoremIpsum from '@/components/tools/lorem-ipsum';
import JsonFormatter from '@/components/tools/json-formatter';
import CaseConverter from '@/components/tools/case-converter';
import PasswordGenerator from '@/components/tools/password-generator';
import Base64Tool from '@/components/tools/base64-tool';
import UrlTool from '@/components/tools/url-tool';
import ColorPicker from '@/components/tools/color-picker';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  searchVolume: string;
  component: React.ReactNode;
}

const tools: Tool[] = [
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, paragraphs, and estimate reading & speaking time in real time.',
    icon: <Type className="h-6 w-6" />,
    category: 'Text',
    searchVolume: '550K/mo',
    component: <WordCounter />,
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for your designs and mockups with customizable paragraph count.',
    icon: <FileText className="h-6 w-6" />,
    category: 'Text',
    searchVolume: '368K/mo',
    component: <LoremIpsum />,
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, minify, and validate JSON data with syntax highlighting and customizable indentation.',
    icon: <Braces className="h-6 w-6" />,
    category: 'Developer',
    searchVolume: '450K/mo',
    component: <JsonFormatter />,
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case and more.',
    icon: <CaseSensitive className="h-6 w-6" />,
    category: 'Text',
    searchVolume: '246K/mo',
    component: <CaseConverter />,
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure, random passwords with customizable length, character types, and strength indicator.',
    icon: <Key className="h-6 w-6" />,
    category: 'Security',
    searchVolume: '823K/mo',
    component: <PasswordGenerator />,
  },
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode text to Base64 or decode Base64 back to text instantly. Supports Unicode characters.',
    icon: <Binary className="h-6 w-6" />,
    category: 'Developer',
    searchVolume: '201K/mo',
    component: <Base64Tool />,
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode or decode URL components. Perfect for working with query parameters and special characters.',
    icon: <Link className="h-6 w-6" />,
    category: 'Developer',
    searchVolume: '165K/mo',
    component: <UrlTool />,
  },
  {
    id: 'color-picker',
    name: 'Color Picker & Converter',
    description: 'Pick colors and convert between HEX, RGB, HSL, and HSV formats. Includes alpha support.',
    icon: <Palette className="h-6 w-6" />,
    category: 'Design',
    searchVolume: '495K/mo',
    component: <ColorPicker />,
  },
];

const categories = ['All', ...Array.from(new Set(tools.map((t) => t.category)))];

export default function HomePage() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTools =
    activeCategory === 'All'
      ? tools
      : tools.filter((t) => t.category === activeCategory);

  const currentTool = tools.find((t) => t.id === activeTool);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button
              onClick={() => setActiveTool(null)}
              className="flex items-center gap-2 text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <Zap className="h-5 w-5" />
              </div>
              <span>QuickTools</span>
            </button>

            {activeTool && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {currentTool?.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTool(null)}
                  className="gap-1.5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">All Tools</span>
                </Button>
              </motion.div>
            )}

            {!activeTool && (
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
          {activeTool && currentTool ? (
            <motion.div
              key={activeTool}
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
                    {currentTool.icon}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">{currentTool.name}</h1>
                    <p className="text-sm text-muted-foreground">{currentTool.description}</p>
                  </div>
                </div>
              </div>

              {/* Ad Placeholder - Top Banner */}
              <div className="mb-6">
                <div className="w-full h-[90px] rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center text-xs text-muted-foreground/60 bg-muted/30">
                  <span>Advertisement Space (728x90 Leaderboard)</span>
                </div>
              </div>

              {/* Tool Content with Sidebar Ad Layout */}
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 min-w-0">
                  {currentTool.component}
                </div>

                {/* Sidebar Ad - Desktop Only */}
                <div className="hidden lg:block w-[300px] shrink-0">
                  <div className="sticky top-24 space-y-6">
                    <div className="h-[250px] rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center text-xs text-muted-foreground/60 bg-muted/30">
                      <span className="text-center">Ad Space<br />(300x250)</span>
                    </div>
                    <div className="h-[250px] rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center text-xs text-muted-foreground/60 bg-muted/30">
                      <span className="text-center">Ad Space<br />(300x250)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Ad - Bottom */}
              <div className="mt-6 lg:hidden">
                <div className="w-full h-[100px] rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center text-xs text-muted-foreground/60 bg-muted/30">
                  <span>Advertisement Space (320x100 Mobile)</span>
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
                        <Wrench className="h-4 w-4 text-emerald-600" />
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
                        onClick={() => setActiveTool(tool.id)}
                      >
                        <CardContent className="p-5 sm:p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/80 transition-colors">
                              {tool.icon}
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

                {/* Bottom Ad Placeholder */}
                <div className="mt-12">
                  <div className="w-full max-w-4xl mx-auto h-[90px] rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center text-xs text-muted-foreground/60 bg-muted/30">
                    <span>Advertisement Space (728x90 Leaderboard)</span>
                  </div>
                </div>
              </section>

              {/* How It Works / Business Model Section */}
              <section className="border-t bg-muted/30">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                  <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                      Why Simple Tool Websites Work
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      This is a live demonstration of the ad-monetized utility website business model.
                      Here&apos;s why it&apos;s so effective:
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    <Card className="text-center">
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex h-12 w-12 mx-auto mb-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
                          <TrendingUp className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-2">High Search Demand</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Millions of people search for &quot;word counter&quot;, &quot;JSON formatter&quot;, and
                          &quot;password generator&quot; every month. These tools answer real, recurring needs.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="text-center">
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex h-12 w-12 mx-auto mb-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
                          <Zap className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-2">Zero Marginal Cost</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          These tools run entirely in the browser. No servers, no databases, no API costs.
                          Once built, they cost nearly nothing to maintain and scale.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="text-center">
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex h-12 w-12 mx-auto mb-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
                          <Users className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-2">Ad Revenue</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          With Google AdSense or other ad networks, even modest traffic (10K-50K
                          visitors/month) can generate $500-$5,000+/month in passive income.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Revenue Examples */}
                  <div className="mt-10 p-6 sm:p-8 rounded-xl border bg-card">
                    <h3 className="font-semibold mb-4 text-center">Real-World Revenue Examples</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { site: 'SmallPDF.com', revenue: '$17.5M/yr', traffic: '30M+/mo' },
                        { site: 'TypingTest.com', revenue: '$140K/mo', traffic: '8M+/mo' },
                        { site: 'BuiltWith.com', revenue: '$995/mo/user', traffic: '2M+/mo' },
                        { site: 'UnitConverters.net', revenue: '$500K+/mo', traffic: '15M+/mo' },
                      ].map((example) => (
                        <div
                          key={example.site}
                          className="text-center p-4 rounded-lg bg-muted/50"
                        >
                          <p className="font-mono text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                            {example.site}
                          </p>
                          <p className="text-lg font-bold mt-1">{example.revenue}</p>
                          <p className="text-xs text-muted-foreground">{example.traffic} visits</p>
                        </div>
                      ))}
                    </div>
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
                <li>
                  <button onClick={() => setActiveTool('word-counter')} className="hover:text-foreground transition-colors">
                    Word Counter
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTool('lorem-ipsum')} className="hover:text-foreground transition-colors">
                    Lorem Ipsum Generator
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTool('case-converter')} className="hover:text-foreground transition-colors">
                    Case Converter
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Developer Tools</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => setActiveTool('json-formatter')} className="hover:text-foreground transition-colors">
                    JSON Formatter
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTool('base64')} className="hover:text-foreground transition-colors">
                    Base64 Encoder/Decoder
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTool('url-encoder')} className="hover:text-foreground transition-colors">
                    URL Encoder/Decoder
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Other Tools</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => setActiveTool('password-generator')} className="hover:text-foreground transition-colors">
                    Password Generator
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTool('color-picker')} className="hover:text-foreground transition-colors">
                    Color Picker
                  </button>
                </li>
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