# Documentation Update Report

Generated: Tue Dec 09 2025 02:00:24 GMT+0000 (Coordinated Universal Time)

## Executive Summary

This report analyzes the current project structure and documentation, identifying discrepancies and providing recommendations for updates.

## Project Structure Overview

### Key Directories

#### src/
```
  🔷 App.tsx

  📁 __tests__/
    📁 components/
      🔷 AgentCard.test.tsx

  📁 actions/
    🔷 flow-actions.ts

  📁 app/
    📁 api/
      📁 agents/
      📁 auth/
      📁 health/
      📁 notion-sync/
      📁 stats/
      📁 tools/
      📁 v1/
    📁 dashboard/
      🔷 page.tsx
    📁 flow/
      📁 [id]/
    🔷 global-error.tsx
    🎨 globals.css
    📁 ide/
      🔷 enhanced-page.tsx
      🔷 page.tsx
    🔷 layout.tsx
    🔷 loading.tsx
    🔷 page.tsx
    🔷 providers.tsx

  📁 common/
    📁 __tests__/
      🔷 sys.test.ts
    🔷 canUseDOM.ts
    🔷 sys.ts

  📁 components/
    🔷 AIChatBox.tsx
    🔷 AgentCard.tsx
    🔷 AiWriterView.tsx
    🔷 Analytics.tsx
    🔷 ChatBubble.tsx
    🔷 ContextSelectorModal.tsx
    🔷 DashboardLayout.tsx
    🔷 DashboardLayoutSkeleton.tsx
    🔷 DashboardView.tsx
    🔷 DictionaryView.tsx
    🔷 ErrorBoundary.tsx
    🔷 ForecastView.tsx
    🔷 GraphView.tsx
    🔷 Header.tsx
    🔷 Icon.tsx
    🔷 IconLibrary.tsx
    🔷 LoreManagerView.tsx
    🔷 ManusDialog.tsx
    🔷 Map.tsx
    🔷 MessageInput.tsx
    🔷 MobileControls.tsx
    🔷 Navbar.tsx
    🔷 NewProjectModal.tsx
    🔷 NoteEditorModal.tsx
    🔷 NotesView.tsx
    🔷 PlaceholderView.tsx
    🔷 PomodoroView.tsx
    🔷 ProjectSelectorDropdown.tsx
    🔷 SettingsModal.tsx
    🔷 SettingsView.tsx
    🔷 ShareModal.tsx
    🔷 Sidebar.tsx
    🔷 StatsCard.tsx
    🔷 StoryStructureGeneratorView.tsx
    🔷 TasksView.tsx
    🔷 ToolCard.tsx
    🔷 ToolEditor.tsx
    🔷 UniverseMapView.tsx
    📁 auth/
      🔷 auth-card.tsx
      🔷 auth-form.tsx
      🔷 password-strength.tsx
      🔷 sign-in-form.tsx
      🔷 sign-up-form.tsx
      🔷 social-login.tsx
    📁 botton/
      🔷 liquid-button.tsx
      🔷 liquid-glass.tsx
    📁 card/
      🔷 Analytics.tsx
      🔷 Navbar.tsx
      🔷 StatsCard.tsx
      🔷 ToolCard.tsx
    📁 charts/
      🔷 StatRingChart.tsx
    📁 chat/
      🔷 chat-interface.tsx
    📁 editor/
      🔷 monaco-editor.tsx
    📁 features/
      📁 collaboration/
      📁 files/
      📁 notifications/
      📁 search/
    📁 flow/
      🔷 flow.tsx
      📁 handles/
      📁 nodes/
    📁 ide/
      🔷 file-explorer.tsx
      🔷 settings-bar.tsx
      🔷 toolbar-button.tsx
    📁 layout/
      🔷 flow-navigation-bar.tsx
      🔷 flow-sidebar.tsx
      🔷 flow-switcher.tsx
      🔷 sidebar-button.tsx
      🔷 sidebar-panel-header.tsx
      📁 sidebar-panels/
    🔷 notion-sync-manager.tsx
    🔷 page.tsx
    🔷 providers.tsx
    📁 settings/
      🔷 page.tsx
      📁 preferences/
    📁 skills/
      🔷 container-terminal.tsx
      🔷 skill-details-dialog.tsx
      🔷 skill-upload-dialog.tsx
      🔷 skills-hub.tsx
    🔷 theme-provider.tsx
    🔷 theme-switcher.tsx
    🔷 theme-toggle.tsx
    📁 ui/
      🔷 Header.tsx
      🔷 accordion.tsx
      🔷 alert-dialog.tsx
      🔷 alert.tsx
      🔷 aspect-ratio.tsx
      🔷 avatar.tsx
      🔷 badge.tsx
      🔷 breadcrumb.tsx
      🔷 button-group.tsx
      🔷 button.tsx
      🔷 calendar.tsx
      🔷 card.tsx
      🔷 carousel.tsx
      🔷 chart.tsx
      🔷 checkbox.tsx
      🔷 collapsible.tsx
      🔷 command.tsx
      🔷 context-menu.tsx
      🔷 dialog.tsx
      🔷 drawer.tsx
      🔷 dropdown-menu.tsx
      🔷 empty.tsx
      🔷 field.tsx
      🔷 form.tsx
      🔷 hover-card.tsx
      🔷 input-group.tsx
      🔷 input-otp.tsx
      🔷 input.tsx
      🔷 item.tsx
      🔷 kbd.tsx
      🔷 label.tsx
      🔷 liquid-button.tsx
      🔷 liquid-glass.tsx
      🔷 logo-mark.tsx
      🔷 menubar.tsx
      🔷 navigation-menu.tsx
      🔷 node-status-indicator.tsx
      🔷 pagination.tsx
      🔷 popover.tsx
      🔷 progress.tsx
      🔷 radio-group.tsx
      🔷 resizable.tsx
      🔷 scroll-area.tsx
      🔷 select.tsx
      🔷 separator.tsx
      🔷 sheet.tsx
      🔷 sidebar.tsx
      🔷 skeleton.tsx
      🔷 slider.tsx
      🔷 sonner.tsx
      🔷 spinner.tsx
      🔷 switch.tsx
      🔷 table.tsx
      🔷 tabs.tsx
      🔷 textarea.tsx
      🔷 toast.tsx
      🔷 toaster.tsx
      🔷 toggle-group.tsx
      🔷 toggle.tsx
      🔷 tooltip.tsx
      🔷 use-mobile.tsx
      🔷 use-toast.ts

  📁 const/
    🔷 hotkey.ts

  🔷 const.ts

  📁 contexts/
    🔷 ThemeContext.tsx
    🔷 chat-context.tsx
    🔷 flow-context.tsx
    🔷 knowledge-context.tsx
    🔷 simulation-context.tsx
    🔷 skills-context.tsx

  📁 editor-kernel/
    📁 __tests__/
      🔷 basic-kernel.test.ts
      🔷 data-source.test.ts
      🔷 decorator-registration.test.ts
      🔷 event.test.ts
      🔷 node.test.ts
      🔷 plugin.test.ts
      🔷 utils.test.ts
    🔷 data-source.ts
    🔷 event.ts
    🔷 index.ts
    📁 inode/
      🔷 helper.ts
      🔷 i-element-node.ts
      🔷 i-node.ts
      🔷 index.ts
      🔷 paragraph-node.ts
      🔷 root-node.ts
      🔷 text-node.ts
    🔷 kernel.ts
    🔷 plugin.ts
    📁 react/
      🔷 LexicalErrorBoundary.tsx
      🔷 PortalAnchor.tsx
      🔷 index.ts
      🔷 react-context.ts
      🔷 react-editor.tsx
      🔷 useAnchor.ts
      🔷 useDecorators.tsx
      🔷 useEditable.ts
      🔷 useLexicalEditor.ts
      🔷 useLexicalNodeSelection.ts
      🔷 useTranslation.ts
    🔷 types.ts
    🔷 utils.ts

  📁 hooks/
    🔷 use-canvas-panning.ts
    🔷 use-mobile.ts
    🔷 use-node-data-by-id.ts
    🔷 use-node-drag-drop.ts
    🔷 use-notifications.ts
    🔷 use-presence.ts
    🔷 use-selected-nodes.ts
    🔷 use-sidebar-shortcuts.ts
    🔷 use-toast.ts
    🔷 useComposition.ts
    🔷 useMobile.tsx
    🔷 usePersistFn.ts

  🎨 index.css

  🔷 index.ts

  🔷 layout.tsx

  📁 lib/
    📁 api/
      🔷 skills-api-enhanced.ts
      🔷 skills-api.ts
    🔷 api.ts
    🔷 auth.ts
    🔷 data-valuation.ts
    🔷 embedding.ts
    📁 hooks/
      🔷 use-shortcut.ts
    🔷 learning-loop.ts
    📁 monaco/
      🔷 normalizePath.ts
      🔷 skill-editor.ts
      🔷 tsc_types.ts
      🔷 virtual-fs.ts
    🔷 notification-manager.ts
    🔷 notion-sync.ts
    🔷 notion.ts
    🔷 permissions.ts
    🔷 slack.ts
    🔷 supabase.ts
    🔷 trpc.ts
    🔷 upstash.ts
    📁 utils/
      🔷 todo-helpers.ts
    🔷 utils.ts
    🔷 websocket-client.ts

  📁 locale/
    🔷 index.ts

  🔷 main.tsx

  📁 pages/
    🔷 APIKeyManagement.tsx
    🔷 About.tsx
    🔷 AuthCallback.tsx
    🔷 Blog.tsx
    🔷 ComponentShowcase.tsx
    🔷 Dashboard.tsx
    🔷 DeveloperDocs.tsx
    🔷 Docs.tsx
    🔷 Home.tsx
    🔷 Login.tsx
    🔷 MagicLinkLogin.tsx
    🔷 NotFound.tsx
    🔷 Pricing.tsx
    🔷 Privacy.tsx
    🔷 Terms.tsx
    📁 homepage/
      🔷 ComponentShowcase.tsx
      🔷 Home.tsx
      🔷 Login.tsx
      🔷 Pricing.tsx
      🔷 agents-preview.tsx
      🔷 features-section.tsx
      🔷 hero-section.tsx
    📁 landing/
      📄 API_INTEGRATION_GUIDE.md
      📄 README.md.backup
      📄 SETUP_GUIDE.md
      📁 app/
      🌐 index.html
      🔷 page.tsx
    📁 login/
      🔷 page.tsx
    📁 marketplace/
      🔷 page.tsx
    📁 skills/
      🔷 page.tsx

  📁 plugins/
    📁 __tests__/
      🔷 basic-plugin.test.ts
    📁 auto-complete/
      🔷 index.ts
      📁 node/
      📁 plugin/
      📁 react/
    📁 code/
      📁 __tests__/
      📁 command/
      📁 demos/
      📄 index.md
      🔷 index.ts
      📁 node/
      📁 plugin/
      📁 react/
    📁 codeblock/
      📁 __tests__/
      📁 command/
      📁 demos/
      📄 index.md
      🔷 index.ts
      📁 plugin/
      📁 react/
      📁 utils/
    📁 common/
      📁 command/
      📁 data-source/
      📁 demos/
      📄 index.md
      🔷 index.ts
      📁 node/
      📁 plugin/
      📁 react/
      📁 utils/
    📁 file/
      📁 command/
      📁 demos/
      📄 index.md
      🔷 index.ts
      📁 node/
      📁 plugin/
      📁 react/
      📁 utils/
    📁 hr/
      📁 command/
      📁 demos/
      📄 index.md
      🔷 index.ts
      📁 node/
      📁 plugin/
      📁 react/
    📁 image/
      📁 __test__/
      📁 command/
      📁 demos/
      📄 index.md
      🔷 index.ts
      📁 node/
      📁 plugin/
      📁 react/
    📁 link/
      📁 __test__/
      📁 command/
      📁 demos/
      📄 index.md
      🔷 index.ts
      📁 node/
      📁 plugin/
      📁 react/
      📁 service/
      📁 utils/
    📁 link-highlight/
      📁 command/
      📁 demos/
      📄 index.md
      🔷 index.ts
      📁 node/
      📁 plugin/
      📁 react/
      📁 utils/
    📁 list/
      📁 __test__/
      📁 command/
      📁 demos/
      📄 index.md
      🔷 index.ts
      📁 plugin/
      📁 react/
      📁 utils/
    📁 litexml/
      📁 __test__/
      📁 command/
      📁 data-source/
      🔷 index.ts
      📁 plugin/
      📁 react/
      📁 service/
      📁 utils/
    📁 markdown/
      📁 command/
      📁 data-source/
      📄 index.md
      🔷 index.ts
      📁 plugin/
      📁 react/
      📁 service/
      📁 utils/
    📁 math/
      📁 __tests__/
      📁 command/
      📁 demos/
      📄 index.md
      🔷 index.ts
      📁 node/
      📁 plugin/
      📁 react/
    📁 mention/
      📁 __test__/
      📁 command/
      📁 demos/
      📄 index.md
      🔷 index.ts
      📁 node/
      📁 plugin/
      📁 react/
    📁 slash/
      📁 demos/
      📄 index.md
      🔷 index.ts
      📁 plugin/
      📁 react/
      📁 service/
      📁 utils/
    📁 table/
      📁 __test__/
      📁 command/
      📁 demos/
      📄 index.md
      🔷 index.ts
      📁 node/
      📁 plugin/
      📁 react/
      📁 utils/
    📁 toolbar/
      🔷 index.ts
      📁 react/
      📁 utils/
    📁 upload/
      📄 index.md
      🔷 index.ts
      📁 plugin/
      📁 service/
      📁 utils/

  📁 react/
    📁 ChatInput/
      🔷 ChatInput.tsx
      📁 demos/
      📄 index.md
      🔷 index.ts
      🔷 style.ts
      🔷 type.ts
    📁 ChatInputActionBar/
      🔷 ChatInputActionBar.tsx
      📁 demos/
      📄 index.md
      🔷 index.ts
      🔷 style.ts
      🔷 type.ts
    📁 ChatInputActions/
      🔷 ChatInputActions.tsx
      📁 components/
      📁 demos/
      📄 index.md
      🔷 index.ts
      🔷 style.ts
      🔷 type.ts
    📁 CodeLanguageSelect/
      🔷 CodeLanguageSelect.tsx
      📁 demos/
      📄 index.md
      🔷 index.ts
      🔷 style.ts
      🔷 type.ts
    📁 Editor/
      🔷 Editor.tsx
      📁 demos/
      📄 index.md
      🔷 index.ts
      🔷 type.ts
      🔷 utils.ts
    📁 EditorProvider/
      📁 demos/
      📄 index.md
      🔷 index.tsx
    📁 FloatActions/
      🔷 FloatActions.tsx
      📁 components/
      📁 demos/
      📄 index.md
      🔷 index.ts
      🔷 style.ts
      🔷 type.ts
    📁 FloatMenu/
      🔷 FloatMenu.tsx
      🔷 index.ts
      🔷 style.ts
      🔷 type.ts
    📁 SendButton/
      🔷 SendButton.tsx
      📁 components/
      📁 demos/
      📄 index.md
      🔷 index.ts
      🔷 style.ts
      🔷 type.ts
    📁 SlashMenu/
      🔷 SlashMenu.tsx
      🔷 index.ts
      🔷 type.ts
    📁 hooks/
      🔷 useEditor.ts
      📁 useEditorState/
      🔷 useSize.ts
    🔷 index.ts

  📁 styles/
    🎨 globals.css

  📁 test/
    🔷 setup.ts

  📁 types/
    🔷 api-types.ts
    🔷 flow.types.ts
    🔷 global.d.ts
    🔷 hotkey.ts
    🔷 index.ts
    🔷 kernel.ts
    🔷 locale.ts
    🔷 node.types.ts
    🔷 simulation.types.ts
    🔷 skills.types.ts

  📁 utils/
    🔷 debug.ts
    🔷 flow-actions.ts
    📁 hotkey/
      🔷 isHotkeyMatch.ts
      🔷 parseHotkeys.ts
      🔷 registerHotkey.ts
    🔷 node-utils.ts
    🔷 updatePosition.ts
    🔷 url.ts

#### server/

  📄 Dockerfile.websocket

  📁 _core/
    🔷 context.ts
    🔷 cookies.ts
    🔷 dataApi.ts
    🔷 env.ts
    🔷 imageGeneration.ts
    🔷 index.ts
    🔷 llm.ts
    🔷 map.ts
    🔷 notification.ts
    🔷 oauth.ts
    🔷 sdk.ts
    🔷 systemRouter.ts
    🔷 trpc.ts
    📁 types/
      🔷 cookie.d.ts
    🔷 vite.ts
    🔷 voiceTranscription.ts

  🔷 auth.ts

  📁 backend-python/
    🟨 App.jsx
    🟨 Board.jsx
    🟨 Chat.jsx
    🟨 ContentSharing.jsx
    🟨 Dashboard.jsx
    📄 Dockerfile
    🟨 EnhancedChat.jsx
    🟨 EnhancedDashboard.jsx
    🟨 EnhancedFileUpload.jsx
    🟨 EnhancedLayout.jsx
    🟨 GraphView.jsx
    🟨 Layout.jsx
    🟨 MindMap.jsx
    🟨 Profile.jsx
    🟨 PromptGenerator.jsx
    🟨 ToolGenerator.jsx
    🟨 WorkStorage.jsx
    📄 ai_service.py
    📄 analytics.py
    📄 analytics_service.py
    📄 automation.py
    📄 chat.py
    📄 config.py
    📄 enhanced_models.py
    📄 enhanced_rag_service.py
    📄 external_integrations.py
    📄 file_upload.py
    📄 integrations.py
    📄 main.py
    📄 n8n_service.py
    📄 notification.py
    📄 notification_service.py
    📄 profile.py
    📄 prompt_tool.py
    📄 rag_service.py
    📄 requirements.txt
    📄 scheduler_service.py
    📄 sharing.py
    📄 visualization.py
    📄 visualization_service.py

  🔷 db.ts

  🟨 healthcheck.js

  📁 mcp-server/
    📁 mcp-tool/
      📄 __init__.py
      📁 __test__/
      📄 base.py
      📄 cli.py
      📄 codebase.py
      📄 codebase_agent.py
      📄 config_manager.py
      📄 conftest.py
      ⚙️ docker-compose.yml
      📄 embedding.py
      📄 file_agent.py
      📄 focus.py
      📄 gdrive.py
      📄 implementations.py
      📄 install.py
      📄 logging.py
      📄 mdx.py
      📄 memory_agent.py
      📄 pyproject.toml
      📄 qdrant.py
      📄 rename.py
      📋 schema.json
      📄 scraper_agent.py
      📄 todo.py
      📄 tokenize.py
      📄 tool_server.py
      📄 vector_agent.py
      📄 whiteboard_agent.py

  📁 nodeserver/
    📄 Dockerfile
    🟨 healthcheck.js
    📋 package.json
    📄 package.json.backup
    🟨 server.js

  📋 package.json

  📁 routers/
    📁 __tests__/
      🔷 developer.test.ts
    🔷 developer.ts

  🔷 routers.ts

  🔷 storage.ts

  🔷 supabase.ts

  🔷 swagger.ts

  🟨 websocket-server.js

#### public/

  🖼️ ai-agent-icon.png

  🖼️ dashboard-icon.png

  🎨 file.svg

  🎨 globe.svg

  🖼️ hero-visual.png

  🎨 icon.svg

  📋 manifest.json

  🖼️ marketplace-icon.png

  🎨 next.svg

  🖼️ placeholder-logo.png

  🎨 placeholder-logo.svg

  🖼️ placeholder-user.jpg

  🖼️ placeholder.jpg

  🎨 placeholder.svg

  📄 robots.txt

  🎨 vercel.svg

  🎨 window.svg

#### scripts/

  📄 backup.sh

  🔷 build.ts

  🔷 clean.ts

  🟨 health-check.js

  🟨 patch-lexical-package-json.js

  🟨 validate-imports.js

#### config/

  📄 Dockerfile

  📄 IMPROVEMENTS.md

  📄 POLICY.md

  📄 README.md

  📄 SETUP_GUIDE.md

  📄 TERMS.md

  📄 VALIDATION_REPORT.md

  📁 agents/
    🔷 ExecutorAgent.ts
    🔷 ForecastAgent.ts
    🔷 PlannerAgent.ts
    🔷 PromptAgent.ts
    🔷 events.ts
    🔷 index.ts

  🌐 api-documentation.html

  🟨 clean-package.config.js

  📄 database-schema.sql

  ⚙️ docker-compose.prod.yml

  ⚙️ docker-compose.yml

  📄 eslint.config.mjs

  🟨 next.config.js

  📁 nginx/
    📄 nginx.conf

  ⚙️ openapi-spec.yaml

  📋 package.json

  📄 package.json.minimal.current

  📄 package.json.test

  ⚙️ pnpm-workspace.yaml

  📄 postcss.config.mjs

  📋 postman-collection.json

  📁 public/
    🖼️ ai-agent-icon.png
    🖼️ dashboard-icon.png
    🎨 file.svg
    🎨 globe.svg
    🖼️ hero-visual.png
    🎨 icon.svg
    📋 manifest.json
    🖼️ marketplace-icon.png
    🎨 next.svg
    🖼️ placeholder-logo.png
    🎨 placeholder-logo.svg
    🖼️ placeholder-user.jpg
    🖼️ placeholder.jpg
    🎨 placeholder.svg
    📄 robots.txt
    🎨 vercel.svg
    🎨 window.svg

  📁 scripts/
    📄 backup.sh
    🔷 build.ts
    🔷 clean.ts
    🟨 health-check.js
    🟨 patch-lexical-package-json.js
    🟨 validate-imports.js

  📁 server/
    📄 Dockerfile.websocket
    📁 _core/
      🔷 context.ts
      🔷 cookies.ts
      🔷 dataApi.ts
      🔷 env.ts
      🔷 imageGeneration.ts
      🔷 index.ts
      🔷 llm.ts
      🔷 map.ts
      🔷 notification.ts
      🔷 oauth.ts
      🔷 sdk.ts
      🔷 systemRouter.ts
      🔷 trpc.ts
      📁 types/
      🔷 vite.ts
      🔷 voiceTranscription.ts
    🔷 auth.ts
    📁 backend-python/
      🟨 App.jsx
      🟨 Board.jsx
      🟨 Chat.jsx
      🟨 ContentSharing.jsx
      🟨 Dashboard.jsx
      📄 Dockerfile
      🟨 EnhancedChat.jsx
      🟨 EnhancedDashboard.jsx
      🟨 EnhancedFileUpload.jsx
      🟨 EnhancedLayout.jsx
      🟨 GraphView.jsx
      🟨 Layout.jsx
      🟨 MindMap.jsx
      🟨 Profile.jsx
      🟨 PromptGenerator.jsx
      🟨 ToolGenerator.jsx
      🟨 WorkStorage.jsx
      📄 ai_service.py
      📄 analytics.py
      📄 analytics_service.py
      📄 automation.py
      📄 chat.py
      📄 config.py
      📄 enhanced_models.py
      📄 enhanced_rag_service.py
      📄 external_integrations.py
      📄 file_upload.py
      📄 integrations.py
      📄 main.py
      📄 n8n_service.py
      📄 notification.py
      📄 notification_service.py
      📄 profile.py
      📄 prompt_tool.py
      📄 rag_service.py
      📄 requirements.txt
      📄 scheduler_service.py
      📄 sharing.py
      📄 visualization.py
      📄 visualization_service.py
    🔷 db.ts
    🟨 healthcheck.js
    📁 mcp-server/
      📁 mcp-tool/
    📁 nodeserver/
      📄 Dockerfile
      🟨 healthcheck.js
      📋 package.json
      📄 package.json.backup
      🟨 server.js
    📋 package.json
    📁 routers/
      📁 __tests__/
      🔷 developer.ts
    🔷 routers.ts
    🔷 storage.ts
    🔷 supabase.ts
    🔷 swagger.ts
    🟨 websocket-server.js

  📁 shared/
    📁 _core/
      🔷 errors.ts
      📁 hooks/
    🔷 const.ts
    📁 stores/
      🔷 flow-store.ts
      🔷 simulation-store.ts
      🔷 skills-store.ts
    🔷 types.ts

  📁 src/
    🔷 App.tsx
    📁 __tests__/
      📁 components/
    📁 actions/
      🔷 flow-actions.ts
    📁 app/
      📁 api/
      📁 dashboard/
      📁 flow/
      🔷 global-error.tsx
      🎨 globals.css
      📁 ide/
      🔷 layout.tsx
      🔷 loading.tsx
      🔷 page.tsx
      🔷 providers.tsx
    📁 common/
      📁 __tests__/
      🔷 canUseDOM.ts
      🔷 sys.ts
    📁 components/
      🔷 AIChatBox.tsx
      🔷 AgentCard.tsx
      🔷 AiWriterView.tsx
      🔷 Analytics.tsx
      🔷 ChatBubble.tsx
      🔷 ContextSelectorModal.tsx
      🔷 DashboardLayout.tsx
      🔷 DashboardLayoutSkeleton.tsx
      🔷 DashboardView.tsx
      🔷 DictionaryView.tsx
      🔷 ErrorBoundary.tsx
      🔷 ForecastView.tsx
      🔷 GraphView.tsx
      🔷 Header.tsx
      🔷 Icon.tsx
      🔷 IconLibrary.tsx
      🔷 LoreManagerView.tsx
      🔷 ManusDialog.tsx
      🔷 Map.tsx
      🔷 MessageInput.tsx
      🔷 MobileControls.tsx
      🔷 Navbar.tsx
      🔷 NewProjectModal.tsx
      🔷 NoteEditorModal.tsx
      🔷 NotesView.tsx
      🔷 PlaceholderView.tsx
      🔷 PomodoroView.tsx
      🔷 ProjectSelectorDropdown.tsx
      🔷 SettingsModal.tsx
      🔷 SettingsView.tsx
      🔷 ShareModal.tsx
      🔷 Sidebar.tsx
      🔷 StatsCard.tsx
      🔷 StoryStructureGeneratorView.tsx
      🔷 TasksView.tsx
      🔷 ToolCard.tsx
      🔷 ToolEditor.tsx
      🔷 UniverseMapView.tsx
      📁 auth/
      📁 botton/
      📁 card/
      📁 charts/
      📁 chat/
      📁 editor/
      📁 features/
      📁 flow/
      📁 ide/
      📁 layout/
      🔷 notion-sync-manager.tsx
      🔷 page.tsx
      🔷 providers.tsx
      📁 settings/
      📁 skills/
      🔷 theme-provider.tsx
      🔷 theme-switcher.tsx
      🔷 theme-toggle.tsx
      📁 ui/
    📁 const/
      🔷 hotkey.ts
    🔷 const.ts
    📁 contexts/
      🔷 ThemeContext.tsx
      🔷 chat-context.tsx
      🔷 flow-context.tsx
      🔷 knowledge-context.tsx
      🔷 simulation-context.tsx
      🔷 skills-context.tsx
    📁 editor-kernel/
      📁 __tests__/
      🔷 data-source.ts
      🔷 event.ts
      🔷 index.ts
      📁 inode/
      🔷 kernel.ts
      🔷 plugin.ts
      📁 react/
      🔷 types.ts
      🔷 utils.ts
    📁 hooks/
      🔷 use-canvas-panning.ts
      🔷 use-mobile.ts
      🔷 use-node-data-by-id.ts
      🔷 use-node-drag-drop.ts
      🔷 use-notifications.ts
      🔷 use-presence.ts
      🔷 use-selected-nodes.ts
      🔷 use-sidebar-shortcuts.ts
      🔷 use-toast.ts
      🔷 useComposition.ts
      🔷 useMobile.tsx
      🔷 usePersistFn.ts
    🎨 index.css
    🔷 index.ts
    🔷 layout.tsx
    📁 lib/
      📁 api/
      🔷 api.ts
      🔷 auth.ts
      🔷 data-valuation.ts
      🔷 embedding.ts
      📁 hooks/
      🔷 learning-loop.ts
      📁 monaco/
      🔷 notification-manager.ts
      🔷 notion-sync.ts
      🔷 notion.ts
      🔷 permissions.ts
      🔷 slack.ts
      🔷 supabase.ts
      🔷 trpc.ts
      🔷 upstash.ts
      📁 utils/
      🔷 utils.ts
      🔷 websocket-client.ts
    📁 locale/
      🔷 index.ts
    🔷 main.tsx
    📁 pages/
      🔷 APIKeyManagement.tsx
      🔷 About.tsx
      🔷 AuthCallback.tsx
      🔷 Blog.tsx
      🔷 ComponentShowcase.tsx
      🔷 Dashboard.tsx
      🔷 DeveloperDocs.tsx
      🔷 Docs.tsx
      🔷 Home.tsx
      🔷 Login.tsx
      🔷 MagicLinkLogin.tsx
      🔷 NotFound.tsx
      🔷 Pricing.tsx
      🔷 Privacy.tsx
      🔷 Terms.tsx
      📁 homepage/
      📁 landing/
      📁 login/
      📁 marketplace/
      📁 skills/
    📁 plugins/
      📁 __tests__/
      📁 auto-complete/
      📁 code/
      📁 codeblock/
      📁 common/
      📁 file/
      📁 hr/
      📁 image/
      📁 link/
      📁 link-highlight/
      📁 list/
      📁 litexml/
      📁 markdown/
      📁 math/
      📁 mention/
      📁 slash/
      📁 table/
      📁 toolbar/
      📁 upload/
    📁 react/
      📁 ChatInput/
      📁 ChatInputActionBar/
      📁 ChatInputActions/
      📁 CodeLanguageSelect/
      📁 Editor/
      📁 EditorProvider/
      📁 FloatActions/
      📁 FloatMenu/
      📁 SendButton/
      📁 SlashMenu/
      📁 hooks/
      🔷 index.ts
    📁 styles/
      🎨 globals.css
    📁 test/
      🔷 setup.ts
    📁 types/
      🔷 api-types.ts
      🔷 flow.types.ts
      🔷 global.d.ts
      🔷 hotkey.ts
      🔷 index.ts
      🔷 kernel.ts
      🔷 locale.ts
      🔷 node.types.ts
      🔷 simulation.types.ts
      🔷 skills.types.ts
    📁 utils/
      🔷 debug.ts
      🔷 flow-actions.ts
      📁 hotkey/
      🔷 node-utils.ts
      🔷 updatePosition.ts
      🔷 url.ts
  📄 todo.md

  📋 tsconfig.json

  🔷 vitest.config.ts
```

## Documentation Status

| File | Status | Last Modified |
|------|--------|---------------|
| README.md | ✅ Exists | 2025-12-09T01:41:16.545Z |
| SETUP_GUIDE.md | ✅ Exists | 2025-12-09T01:36:35.210Z |
| IMPROVEMENTS.md | ✅ Exists | 2025-12-09T01:43:12.485Z |
| VALIDATION_REPORT.md | ✅ Exists | 2025-12-09T01:51:03.590Z |
| docker-compose.yml | ✅ Exists | 2025-12-09T01:49:43.511Z |
| .env.example | ✅ Exists | 2025-12-09T00:00:34.000Z |
| package.json | ✅ Exists | 2025-12-09T01:40:43.581Z |
| tsconfig.json | ✅ Exists | 2025-12-09T01:39:50.569Z |

## Version Analysis

### Current Environment
- **Node.js**: v18.19.0
- **Required**: Not specified
- **React**: 19.2.0
- **Next.js**: 16.0.7

### Conflicts Detected
- **react_version**: React 19.2.0 may conflict with Next.js 16.0.7

## Recommendations

### Resolve React version conflicts (Priority: high)

React 19.2.0 may conflict with Next.js 16.0.7

**Solutions:**
- Consider downgrading React to v18.x for compatibility
- Or upgrade Next.js to a version that supports React 19
- Check peer dependency requirements in package.json

### Standardize project structure (Priority: medium)

Ensure consistent folder organization across all services

**Solutions:**
- Move misplaced files to their proper locations
- Create missing standard folders (components, hooks, utils, types)
- Update import paths to match new structure
- Update documentation to reflect current structure


## Next Steps

1. **Immediate Actions** (Critical Priority)
   - None

2. **Short-term Actions** (High Priority)
   - Resolve React version conflicts

3. **Medium-term Actions** (Medium Priority)
   - Standardize project structure

---
