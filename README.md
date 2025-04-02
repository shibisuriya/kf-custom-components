# Kissflow custom component

A collection of Kissflow custom components.

# Clone the repo

**Note: Do not clone the repo using the default `git clone` command provided by github,
the git submodules won't be cloned and the `packages` present in the repo won't build/serve.**

To clone the repo (including all the git submodules),

```bash
git clone --recurse-submodules https://github.com/shibisuriya/kf-custom-form-fields.git
```

# Installation

`pnpm` is required to work with this repo since it is a 'pnpm workspace'.

To install `pnpm`,

```bash
npm install -g pnpm
```

Then install the repo's dependencies using pnpm,

```bash
pnpm install
```

# Build or serve custom components for development

Change directory to the custom component that you want to build/serve,

For example,

```bash
cd ./custom-components/form-field/text-texteditor
```

To build the custom component and create a .zip file that can be uploaded to Kissflow,

```bash
pnpm run zip
```

To serve the custom component for development,

```
pnpm run dev
```
