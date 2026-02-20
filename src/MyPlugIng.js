import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class MathPlugin extends Plugin {
    init() {
        const editor = this.editor;

        // Register the math command
        editor.commands.add('insertMath', {
            exec: (editor) => {
                // You can implement logic to insert the mathematical special character here
                const mathSymbol = '∑'; // Example: Insert the summation symbol
                editor.model.change((writer) => {
                    const position = editor.model.document.selection.getFirstPosition();
                    writer.insertText(mathSymbol, position);
                });
            }
        });

        // Add the 'insertMath' button to the toolbar
        editor.ui.componentFactory.add('insertMath', (locale) => {
            const button = editor.ui.componentFactory.createButton('insertMath');

            button.set({
                label: 'Insert Math',
                icon: '<svg>...</svg>', // You can add your own icon
                tooltip: true
            });

            // Execute the 'insertMath' command on button click
            button.on('execute', () => {
                editor.execute('insertMath');
            });

            return button;
        });
    }
}
