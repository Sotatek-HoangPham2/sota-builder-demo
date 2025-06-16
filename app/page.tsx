"use client";

import { useState } from "react";
import GrapesJsStudio, {
  StudioCommands,
  ToastVariant,
} from "@grapesjs/studio-sdk/react";
import chartjsPlugin from "grapesjs-chartjs-plugin";
import { tableComponent } from "@grapesjs/studio-sdk-plugins";

type Editor = any;

import "@grapesjs/studio-sdk/style";

export default function Home() {
  const [editor, setEditor] = useState<Editor>();

  const onReady = (editor: Editor) => {
    console.log("Editor loaded", editor);
    setEditor(editor);
  };

  const showToast = (id: string) =>
    editor?.runCommand(StudioCommands.toastAdd, {
      id,
      header: "Toast header",
      content: "Data logged in console",
      variant: ToastVariant.Info,
    });

  const getProjetData = () => {
    if (editor) {
      console.log({ projectData: editor?.getProjectData() });
      showToast("log-project-data");
    }
  };

  const getExportData = () => {
    if (editor) {
      console.log({ html: editor?.getHtml(), css: editor?.getCss() });
      showToast("log-html-css");
    }
  };

  return (
    <main className='flex h-screen flex-col justify-between p-5 gap-2'>
      <div className='p-1 flex gap-5'>
        <div className='font-bold'>Sota Builder</div>
        <button className='border rounded px-2' onClick={getProjetData}>
          Log Project Data
        </button>
        <button className='border rounded px-2' onClick={getExportData}>
          Log HTML/CSS
        </button>
      </div>
      <div className='flex-1 w-full h-full overflow-hidden'>
        <GrapesJsStudio
          onReady={onReady}
          options={{
            licenseKey: process.env.NEXT_PUBLIC_GRAPEJS_KEY || '',
            project: {
              default: {
                pages: [
                  {
                    name: "Home",
                    component: `<h1 style="padding: 2rem; text-align: center">
                      Hello Studio 👋
                    </h1>`,
                  },
                ],
              },
            },
            plugins: [
              (editor) =>
                chartjsPlugin(editor, {
                  /* options */
                }),
              tableComponent.init({
                block: { category: "Extra", label: "My Table" },
              }),
            ],
          }}
        />
      </div>
    </main>
  );
}
