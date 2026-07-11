'use client';

import { useState, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  Braces,
  Copy,
  Trash2,
  Check,
  AlertCircle,
  Minimize2,
  AlignLeft,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type IndentSize = '2' | '4' | 'tab';
type ValidationStatus = { valid: boolean; message: string } | null;

function getIndent(indentSize: IndentSize): string | number {
  switch (indentSize) {
    case '2':
      return 2;
    case '4':
      return 4;
    case 'tab':
      return '\t';
    default:
      return 2;
  }
}

function syntaxHighlight(json: string): string {
  return json.replace(
    /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = 'text-amber-600'; // number
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'text-emerald-700 font-semibold'; // key
        } else {
          cls = 'text-rose-600'; // string
        }
      } else if (/true|false/.test(match)) {
        cls = 'text-purple-600'; // boolean
      } else if (/null/.test(match)) {
        cls = 'text-slate-400 italic'; // null
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indentSize, setIndentSize] = useState<IndentSize>('2');
  const [validation, setValidation] = useState<ValidationStatus>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const parseInput = useCallback(
    (text: string): { parsed: unknown; error: string | null } => {
      if (!text.trim()) {
        return { parsed: null, error: null };
      }
      try {
        const parsed = JSON.parse(text);
        return { parsed, error: null };
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Invalid JSON';
        return { parsed: null, error: message };
      }
    },
    []
  );

  const handleFormat = useCallback(() => {
    const { parsed, error } = parseInput(input);
    if (error) {
      setValidation({ valid: false, message: error });
      setOutput('');
      return;
    }
    if (parsed === null) {
      setValidation(null);
      setOutput('');
      return;
    }
    const indent = getIndent(indentSize);
    const formatted = JSON.stringify(parsed, null, indent);
    setOutput(formatted);
    setValidation({ valid: true, message: 'Valid JSON' });
  }, [input, indentSize, parseInput]);

  const handleMinify = useCallback(() => {
    const { parsed, error } = parseInput(input);
    if (error) {
      setValidation({ valid: false, message: error });
      setOutput('');
      return;
    }
    if (parsed === null) {
      setValidation(null);
      setOutput('');
      return;
    }
    const minified = JSON.stringify(parsed);
    setOutput(minified);
    setValidation({ valid: true, message: 'Valid JSON' });
  }, [input, parseInput]);

  const handleValidate = useCallback(() => {
    const { error } = parseInput(input);
    if (input.trim() === '') {
      setValidation(null);
      return;
    }
    if (error) {
      setValidation({ valid: false, message: error });
    } else {
      setValidation({ valid: true, message: 'Valid JSON' });
    }
  }, [input, parseInput]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setValidation(null);
    setCopied(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'Formatted JSON copied to clipboard.',
      });
      setTimeout(() => setCopied(false), 2000);
    });
  }, [output, toast]);

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-3">
            {/* Indent selector */}
            <div className="flex items-center gap-2 mr-auto">
              <span className="text-sm font-medium text-slate-600 whitespace-nowrap">
                Indent:
              </span>
              <Select
                value={indentSize}
                onValueChange={(val) => setIndentSize(val as IndentSize)}
              >
                <SelectTrigger className="w-[130px] border-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Spaces</SelectItem>
                  <SelectItem value="4">4 Spaces</SelectItem>
                  <SelectItem value="tab">Tab</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action buttons */}
            <Button
              onClick={handleFormat}
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <AlignLeft className="mr-1.5 h-4 w-4" />
              Format
            </Button>
            <Button
              onClick={handleMinify}
              size="sm"
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              <Minimize2 className="mr-1.5 h-4 w-4" />
              Minify
            </Button>
            <Button
              onClick={handleValidate}
              size="sm"
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              <Check className="mr-1.5 h-4 w-4" />
              Validate
            </Button>
            <Button
              onClick={handleCopy}
              size="sm"
              variant="outline"
              disabled={!output}
              className="border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              {copied ? (
                <Check className="mr-1.5 h-4 w-4 text-emerald-600" />
              ) : (
                <Copy className="mr-1.5 h-4 w-4" />
              )}
              {copied ? 'Copied!' : 'Copy Output'}
            </Button>
            <Button
              onClick={handleClear}
              size="sm"
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              <Trash2 className="mr-1.5 h-4 w-4" />
              Clear
            </Button>
          </div>

          {/* Validation status */}
          {validation && (
            <div className="mt-4 flex items-center gap-2">
              {validation.valid ? (
                <Badge
                  variant="outline"
                  className="bg-emerald-50 text-emerald-700 border-emerald-200 py-1 px-3"
                >
                  <Check className="mr-1.5 h-3.5 w-3.5" />
                  {validation.message}
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-red-50 text-red-700 border-red-200 py-1 px-3"
                >
                  <AlertCircle className="mr-1.5 h-3.5 w-3.5" />
                  {validation.message}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-800">
              <Braces className="h-4.5 w-4.5 text-emerald-600" />
              Input
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                'Paste your JSON here...\n\nExample:\n{"name": "John", "age": 30}'
              }
              className="font-mono text-sm min-h-[420px] resize-y border-slate-300 bg-slate-50 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-400 placeholder:text-slate-400"
            />
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-800">
              <Braces className="h-4.5 w-4.5 text-emerald-600" />
              Output
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="font-mono text-sm min-h-[420px] max-h-[600px] overflow-auto rounded-md border border-slate-300 bg-white p-4"
            >
              {output ? (
                <pre
                  className="whitespace-pre-wrap break-words"
                  dangerouslySetInnerHTML={{
                    __html: syntaxHighlight(output),
                  }}
                />
              ) : (
                <span className="text-slate-400 italic">
                  Formatted output will appear here...
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
