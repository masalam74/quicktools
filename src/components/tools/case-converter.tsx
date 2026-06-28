'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CaseSensitive, Copy, Trash2, ArrowRightLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConversionOption {
  label: string;
  preview: string;
  convert: (input: string) => string;
}

const toTitleCase = (str: string): string =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
  );

const toSentenceCase = (str: string): string =>
  str
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());

const toCamelCase = (str: string): string =>
  str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr: string) => chr.toUpperCase())
    .replace(/^[A-Z]/, (chr) => chr.toLowerCase());

const toPascalCase = (str: string): string =>
  str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr: string) => chr.toUpperCase())
    .replace(/^[a-z]/, (chr) => chr.toUpperCase());

const toSnakeCase = (str: string): string =>
  str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .toLowerCase()
    .replace(/^_|_$/g, '');

const toKebabCase = (str: string): string =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .toLowerCase()
    .replace(/^-|-$/g, '');

const toConstantCase = (str: string): string =>
  str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .toUpperCase()
    .replace(/^_|_$/g, '');

const toDotCase = (str: string): string =>
  str
    .replace(/([a-z])([A-Z])/g, '$1.$2')
    .replace(/[^a-zA-Z0-9]+/g, '.')
    .toLowerCase()
    .replace(/^\.|\.$/g, '');

const toToggleCase = (str: string): string =>
  str
    .split('')
    .map((chr, i) =>
      i % 2 === 0 ? chr.toLowerCase() : chr.toUpperCase(),
    )
    .join('');

const conversions: ConversionOption[] = [
  {
    label: 'UPPERCASE',
    preview: 'HELLO WORLD',
    convert: (s) => s.toUpperCase(),
  },
  {
    label: 'lowercase',
    preview: 'hello world',
    convert: (s) => s.toLowerCase(),
  },
  {
    label: 'Title Case',
    preview: 'Hello World',
    convert: toTitleCase,
  },
  {
    label: 'Sentence case',
    preview: 'Hello world. This is a test.',
    convert: toSentenceCase,
  },
  {
    label: 'camelCase',
    preview: 'helloWorld',
    convert: toCamelCase,
  },
  {
    label: 'PascalCase',
    preview: 'HelloWorld',
    convert: toPascalCase,
  },
  {
    label: 'snake_case',
    preview: 'hello_world',
    convert: toSnakeCase,
  },
  {
    label: 'kebab-case',
    preview: 'hello-world',
    convert: toKebabCase,
  },
  {
    label: 'CONSTANT_CASE',
    preview: 'HELLO_WORLD',
    convert: toConstantCase,
  },
  {
    label: 'dot.case',
    preview: 'hello.world',
    convert: toDotCase,
  },
  {
    label: 'Toggle cASE',
    preview: 'hElLo WoRlD',
    convert: toToggleCase,
  },
];

export default function CaseConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [activeConversion, setActiveConversion] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConvert = useCallback(
    (conversion: ConversionOption) => {
      if (!input.trim()) return;
      const result = conversion.convert(input);
      setOutput(result);
      setActiveConversion(conversion.label);
    },
    [input],
  );

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: 'Copied to clipboard',
        description: 'The converted text has been copied.',
      });
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Could not copy to clipboard. Please select and copy manually.',
        variant: 'destructive',
      });
    }
  }, [output, toast]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setActiveConversion(null);
  }, []);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <CaseSensitive className="h-5 w-5 text-emerald-600" />
          Case Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input */}
        <div className="space-y-2">
          <label
            htmlFor="case-input"
            className="text-sm font-medium text-muted-foreground"
          >
            Input Text
          </label>
          <Textarea
            id="case-input"
            placeholder="Type or paste your text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[120px] resize-y border-emerald-200 focus-visible:ring-emerald-500"
          />
        </div>

        {/* Conversion buttons */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <ArrowRightLeft className="h-4 w-4 text-emerald-600" />
            Select Conversion
          </div>
          <div className="flex flex-wrap gap-2">
            {conversions.map((conversion) => (
              <Button
                key={conversion.label}
                variant={
                  activeConversion === conversion.label ? 'default' : 'outline'
                }
                size="sm"
                onClick={() => handleConvert(conversion)}
                disabled={!input.trim()}
                className={
                  activeConversion === conversion.label
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300'
                }
              >
                <span className="font-semibold">{conversion.label}</span>
                <span className="ml-1.5 text-xs opacity-60 hidden sm:inline">
                  {conversion.preview}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Output */}
        <div className="space-y-2">
          <label
            htmlFor="case-output"
            className="text-sm font-medium text-muted-foreground"
          >
            Output Text
          </label>
          <Textarea
            id="case-output"
            readOnly
            placeholder="Converted text will appear here..."
            value={output}
            className="min-h-[120px] resize-y bg-emerald-50/50 border-emerald-200 text-foreground"
          />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleCopy}
            disabled={!output}
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Result
          </Button>
          <Button
            variant="outline"
            onClick={handleClear}
            disabled={!input && !output}
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}