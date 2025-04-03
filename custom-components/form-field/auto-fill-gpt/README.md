# AutoFillGPT

A form field that takes a prompt as input and fills the form by understanding the prompt and the form's structure!

Note: This custom form field has a server component, the form field sends the prompt & the form's structure to the server,
the server then uses a LLM to generate values for all the fields present in the form by understanding the prompt.

Note: This field is a wip.

## The server

As mentioned above this form field has a server component, the source code for which is located at `custom-components/form-field/form-gpt-server`.

### To install dependencies,

```bash
npm install
```

### To serve the project for development,

```bash
npm run dev
```

### To build the project,

```bash
npm run build
```

### To zip the build artifacts for distribution,

```bash
npm run zip
```
