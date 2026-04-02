import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Quartz 4",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
      theme: {
      fontOrigin: "local", // 구글 폰트를 받지 않고 기기 기본 폰트 사용 (속도 극대화)
      typography: {
        header: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        code: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
      },
      colors: {
        lightMode: {
          light: "#ffffff", // 순백색 배경
          lightgray: "#f0f0f0", // 아주 연한 선
          gray: "#999999",
          darkgray: "#111111", // 거의 검은색에 가까운 본문 텍스트
          dark: "#000000", // 제목
          secondary: "#cc0000", // kepano 특유의 은은한 붉은/주황색 링크 포인트
          tertiary: "#ffaaaa",
          highlight: "rgba(204, 0, 0, 0.05)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#111111", // 완전 칠흑보다는 아주 약간 밝은 다크모드 배경
          lightgray: "#333333",
          gray: "#777777",
          darkgray: "#eeeeee", // 눈이 덜 피로한 밝은 회색 텍스트
          dark: "#ffffff",
          secondary: "#ff5555", // 다크모드용 붉은색 포인트
          tertiary: "#aa4444",
          highlight: "rgba(255, 85, 85, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
