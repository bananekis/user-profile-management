import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

interface RichTextEditorProps {
	content: string;
	onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
	content,
	onChange,
}) => {
	const editor = useEditor({
		extensions: [StarterKit, Image],
		content,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	if (!editor) {
		return null;
	}

	return (
		<div className="border border-gray-300 rounded-md p-2">
			<EditorContent editor={editor} />
		</div>
	);
};

export default RichTextEditor;
