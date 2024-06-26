<script setup lang="ts">
import type { CodeBlockProps } from './CodeBlock.types';
import { useCodeBlock } from './useCodeBlock';

const props = withDefaults(defineProps<CodeBlockProps>(), {
  lang: 'plain',
  target: undefined,
  theme: 'dracula-soft',
  transformers: () => [],
});

const { code } = useCodeBlock(props);
</script>

<template>
  <div v-html="code" />
</template>

<style lang="scss">
.shiki {
  overflow: auto;
  background: #1c151b !important;
  border-radius: var(--radius-md);
}

.shiki code {
  display: block;
  width: fit-content;
  min-width: 100%;
  padding: var(--spacing-lg);
  line-height: 1.72;
  transition: color 0.5s;

  .line {
    padding-inline: var(--spacing-lg);
    margin-inline: calc(var(--spacing-lg) * -1);

    &.diff {
      display: inline-block;
      width: calc(100% + 2 * var(--spacing-lg));
    }

    &.remove {
      background: #ff04043b;
      opacity: 0.7;
    }

    &.add {
      background: #21e84b2b;
    }
  }
}
</style>

<style>
:root {
  --twoslash-border-color: #8888;
  --twoslash-underline-color: currentColor;
  --twoslash-highlighted-border: #c37d0d50;
  --twoslash-highlighted-bg: #c37d0d20;
  --twoslash-popup-bg: #f8f8f8;
  --twoslash-popup-color: inherit;
  --twoslash-popup-shadow: rgb(0 0 0 / 8%) 0px 1px 4px;
  --twoslash-docs-color: #888;
  --twoslash-docs-font: sans-serif;
  --twoslash-code-font: inherit;
  --twoslash-code-font-size: 1em;
  --twoslash-matched-color: inherit;
  --twoslash-unmatched-color: #888;
  --twoslash-cursor-color: #8888;
  --twoslash-error-color: #d45656;
  --twoslash-error-bg: #d4565620;
  --twoslash-warn-color: #c37d0d;
  --twoslash-warn-bg: #c37d0d20;
  --twoslash-tag-color: #3772cf;
  --twoslash-tag-bg: #3772cf20;
  --twoslash-tag-warn-color: var(--twoslash-warn-color);
  --twoslash-tag-warn-bg: var(--twoslash-warn-bg);
  --twoslash-tag-annotate-color: #1ba673;
  --twoslash-tag-annotate-bg: #1ba67320;
}

/* Respect people's wishes to not have animations */
@media (prefers-reduced-motion: reduce) {
  .twoslash * {
    transition: none !important;
  }
}

.twoslash .twoslash-hover {
  position: relative;
  border-bottom: 1px dotted transparent;
  transition: border-color 0.3s;
  transition-timing-function: ease;
}

.twoslash:hover .twoslash-hover {
  border-color: var(--twoslash-underline-color);
}

.twoslash .twoslash-popup-container {
  position: absolute;
  z-index: 10;
  display: inline-flex;
  flex-direction: column;
  color: var(--twoslash-popup-color);
  text-align: left;
  pointer-events: none;
  user-select: none;
  background: var(--twoslash-popup-bg);
  border: 1px solid var(--twoslash-border-color);
  border-radius: 4px;
  box-shadow: var(--twoslash-popup-shadow);
  opacity: 0;
  transition: opacity 0.3s;
  transform: translateY(1.1em);
}

.twoslash .twoslash-query-presisted .twoslash-popup-container {
  z-index: 9;
  transform: translateY(1.5em);
}

.twoslash .twoslash-popup-container:hover {
  user-select: auto;
}

.twoslash .twoslash-hover:hover .twoslash-popup-container,
.twoslash .twoslash-error-hover:hover .twoslash-popup-container,
.twoslash .twoslash-query-presisted .twoslash-popup-container {
  pointer-events: auto;
  opacity: 1;
}

.twoslash .twoslash-popup-arrow {
  position: absolute;
  top: -4px;
  left: 1em;
  width: 6px;
  height: 6px;
  pointer-events: none;
  background: var(--twoslash-popup-bg);
  border-top: 1px solid var(--twoslash-border-color);
  border-right: 1px solid var(--twoslash-border-color);
  transform: rotate(-45deg);
}

.twoslash .twoslash-popup-code,
.twoslash .twoslash-popup-error,
.twoslash .twoslash-popup-docs {
  padding: 6px 8px !important;
}

.twoslash .twoslash-popup-code {
  font-family: var(--twoslash-code-font);
  font-size: var(--twoslash-code-font-size);
}

.twoslash .twoslash-popup-docs {
  font-family: var(--twoslash-docs-font);
  font-size: 0.8em;
  color: var(--twoslash-docs-color);
  border-top: 1px solid var(--twoslash-border-color);
}

.twoslash .twoslash-popup-error {
  font-family: var(--twoslash-docs-font);
  font-size: 0.8em;
  color: var(--twoslash-error-color);
  background-color: var(--twoslash-error-bg);
}

.twoslash .twoslash-popup-docs-tags {
  display: flex;
  flex-direction: column;
  font-family: var(--twoslash-docs-font);
}

.twoslash .twoslash-popup-docs-tags,
.twoslash .twoslash-popup-docs-tag-name {
  margin-right: 0.5em;
}

.twoslash .twoslash-popup-docs-tag-name {
  font-family: var(--twoslash-code-font);
}

.twoslash .twoslash-error-line {
  position: relative;
  width: max-content;
  min-width: 100%;
  padding: 6px 12px;
  margin: 0.2em 0;
  color: var(--twoslash-error-color);
  background-color: var(--twoslash-error-bg);
  border-left: 3px solid var(--twoslash-error-color);
}

.twoslash .twoslash-error-line.twoslash-error-level-warning {
  color: var(--twoslash-warn-color);
  background-color: var(--twoslash-warn-bg);
  border-left: 3px solid var(--twoslash-warn-color);
}

.twoslash .twoslash-error {
  padding-bottom: 2px;
  background: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%206%203'%20enable-background%3D'new%200%200%206%203'%20height%3D'3'%20width%3D'6'%3E%3Cg%20fill%3D'%23c94824'%3E%3Cpolygon%20points%3D'5.5%2C0%202.5%2C3%201.1%2C3%204.1%2C0'%2F%3E%3Cpolygon%20points%3D'4%2C0%206%2C2%206%2C0.6%205.4%2C0'%2F%3E%3Cpolygon%20points%3D'0%2C2%201%2C3%202.4%2C3%200%2C0.6'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")
    repeat-x bottom left;
}

.twoslash .twoslash-error.twoslash-error-level-warning {
  padding-bottom: 2px;
  background: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%206%203'%20enable-background%3D'new%200%200%206%203'%20height%3D'3'%20width%3D'6'%3E%3Cg%20fill%3D'%23c37d0d'%3E%3Cpolygon%20points%3D'5.5%2C0%202.5%2C3%201.1%2C3%204.1%2C0'%2F%3E%3Cpolygon%20points%3D'4%2C0%206%2C2%206%2C0.6%205.4%2C0'%2F%3E%3Cpolygon%20points%3D'0%2C2%201%2C3%202.4%2C3%200%2C0.6'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")
    repeat-x bottom left;
}

.twoslash .twoslash-completion-cursor {
  position: relative;
}

.twoslash-completion-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 240px;
  padding: 4px;
  font-size: 0.8rem;
}

.twoslash-completion-list:hover {
  user-select: auto;
}

.twoslash .twoslash-completion-cursor .twoslash-completion-list {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 8;
  display: inline-block;
  margin: 3px 0 0 -1px;
  user-select: none;
  background: var(--twoslash-popup-bg);
  border: 1px solid var(--twoslash-border-color);
  box-shadow: var(--twoslash-popup-shadow);
  transform: translate(0, 1.2em);
}

.twoslash-completion-list::before {
  position: absolute;
  top: -1.6em;
  left: -1px;
  width: 2px;
  height: 1.4em;
  content: ' ';
  background-color: var(--twoslash-cursor-color);
}

.twoslash-completion-list li {
  display: flex;
  gap: 0.25em;
  align-items: center;
  overflow: hidden;
  line-height: 1em;
}

.twoslash-completion-list li span.twoslash-completions-unmatched {
  color: var(--twoslash-unmatched-color);
}

.twoslash-completion-list .deprecated {
  text-decoration: line-through;
  opacity: 0.5;
}

.twoslash-completion-list li span.twoslash-completions-matched {
  color: var(--twoslash-matched-color);
}

/* Highlights */
.twoslash-highlighted {
  padding: 1px 2px;
  margin: -1px -3px;
  background-color: var(--twoslash-highlighted-bg);
  border: 1px solid var(--twoslash-highlighted-border);
  border-radius: 4px;
}

/* Icons */
.twoslash-completion-list .twoslash-completions-icon {
  flex: none;
  width: 1em;
  color: var(--twoslash-unmatched-color);
}

/* Custom Tags */
.twoslash .twoslash-tag-line {
  position: relative;
  display: flex;
  gap: 0.3em;
  align-items: center;
  width: max-content;
  min-width: 100%;
  padding: 6px 10px;
  margin: 0.2em 0;
  color: var(--twoslash-tag-color);
  background-color: var(--twoslash-tag-bg);
  border-left: 3px solid var(--twoslash-tag-color);
}

.twoslash .twoslash-tag-line .twoslash-tag-icon {
  width: 1.1em;
  color: inherit;
}

.twoslash .twoslash-tag-line.twoslash-tag-error-line {
  color: var(--twoslash-error-color);
  background-color: var(--twoslash-error-bg);
  border-left: 3px solid var(--twoslash-error-color);
}

.twoslash .twoslash-tag-line.twoslash-tag-warn-line {
  color: var(--twoslash-tag-warn-color);
  background-color: var(--twoslash-tag-warn-bg);
  border-left: 3px solid var(--twoslash-tag-warn-color);
}

.twoslash .twoslash-tag-line.twoslash-tag-annotate-line {
  color: var(--twoslash-tag-annotate-color);
  background-color: var(--twoslash-tag-annotate-bg);
  border-left: 3px solid var(--twoslash-tag-annotate-color);
}
</style>
