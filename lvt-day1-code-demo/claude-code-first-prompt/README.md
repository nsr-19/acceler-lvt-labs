# Claude Code Demos: Your First Prompt

A small, hands on demo for learning Claude Code. It pairs a realistic sample project with a short lesson and a set of step by step exercises, so you can practice writing your first prompts and stay in control of every change Claude Code makes.

## Project Overview

This repository is a teaching resource for Claude Code. It brings three things together.

* **A sample project.** FlowState is a modern landing page for a fictional project management product. It is built with plain HTML, CSS, and vanilla JavaScript, with no frameworks, no build tools, and no dependencies. It is small enough to read in one sitting and realistic enough to show meaningful changes.
* **A lesson.** `Your First Prompt.docx` explains how to talk to Claude Code, how to choose between approval and auto accept modes, and how to use Plan Mode to plan a change before any code is touched.
* **A set of exercises.** The `exercises` folder turns the lesson into guided practice you can follow one step at a time.

The FlowState page is the starting point. It currently ships as a light theme only page, and the exercises walk you through extending it with Claude Code.

The page itself includes a sticky header with a logo, navigation, and a call to action, a hero section with a headline and a pure CSS product preview, a strip of placeholder customer logos, three feature cards, three testimonials, a pricing section with a monthly and annual switch and a highlighted plan, a closing call to action band, and a multi column footer. On narrow screens the navigation collapses into a menu behind a button.

## Important Note on Intentional Flaws

Some parts of this project are intentionally left incomplete or imperfect for learning. They are deliberate, and they should not be treated as bugs to fix.

The clearest example is the comment at the very top of `styles.css`, which states that dark mode is intentionally not implemented yet. That line is a marker, not an oversight. It signals the exact feature you are meant to build during the exercises, and it is left in place on purpose.

As you work through the guides, you may be asked to notice details like this and understand them rather than change them. Please leave intentional markers as they are. The goal is to practice reading and reviewing code, which is one of the most valuable skills when you work alongside an AI assistant.

## Prerequisites

To view the demo you only need the following.

* A modern web browser such as Chrome, Firefox, Safari, or Edge.

Optionally, to serve the page over a local web address, you can use either of these.

* Python 3, which most systems already have.
* Node.js, if you prefer to run a server with `npx`.

To work through the exercises you also need the following.

* The Claude Code command line tool, installed and ready to run.
* Access to your Claude account.
* A terminal open in the root folder of this repository.

## Installation

There is no build step. The page runs straight from the files.

1. Get the project onto your machine by cloning this repository or downloading it.
2. Move into the project folder, the folder that contains `index.html`.
3. Open the page using one of the methods in the next section.

To prepare for the exercises, install the Claude Code command line tool, then open a terminal in this folder and run `claude`.

## Project Structure

```
.
├── index.html                        # Markup and page content for the FlowState landing page
├── styles.css                        # All styling, design tokens as CSS variables, and responsive rules
├── script.js                         # Mobile navigation, header scroll state, scroll reveal, billing toggle, footer year
├── README.md                         # This file
├── Your First Prompt.docx            # The lesson this demo supports
└── exercises/                        # Step by step guides derived from the lesson
    ├── README.md                     # How to use the exercises, plus the key takeaways
    ├── 01-choosing-your-approval-mode.md
    ├── 02-using-plan-mode.md
    └── 03-add-a-dark-mode-toggle.md
```

## Running the Demos

FlowState is a static page, so you can open it directly or serve it locally.

**Open the file directly.** On macOS you can run the command below, or you can double click `index.html` in your file browser.

```bash
open index.html
```

**Serve it locally.** A static server avoids any browser quirks and mirrors a real deployment. Use either option below, then visit the address it prints.

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000

# or, with Node.js installed
npx serve
```

Once the page is open, try the interactions so you can see the demo working.

* Toggle the pricing section between monthly and annual to watch the prices update.
* Make the browser window narrow and confirm the navigation collapses into a menu behind a button.
* Scroll down the page and watch each section reveal as it comes into view.

## Exercises

The `exercises` folder contains the guided practice for this demo. Start with `exercises/README.md`, which explains how to use the guides and lists the key takeaways from the lesson.

Work through the guides in order.

1. `exercises/01-choosing-your-approval-mode.md` teaches the difference between approval mode and auto accept mode.
2. `exercises/02-using-plan-mode.md` teaches how Plan Mode studies your project and returns a plan before any code changes.
3. `exercises/03-add-a-dark-mode-toggle.md` is the main worked exercise, where you combine a descriptive prompt with Plan Mode to add a dark mode toggle to FlowState and then review the result.

## Additional Notes

**The lesson.** `Your First Prompt.docx` is the source lesson that these exercises are built from. It is worth reading first if you want the full context.

**Design notes.**

* The color system lives in CSS variables inside the `:root` block at the top of `styles.css`, anchored on an indigo and violet accent.
* Typography uses the Inter and system font stack, so it renders consistently with no web font download.
* Layouts use CSS Grid and Flexbox, with responsive breakpoints that reflow the page for tablets and phones. The pricing grid surfaces the recommended plan first on small screens.
* Accessible touches include a keyboard operable billing toggle, `aria` attributes on interactive controls, and a reduced motion fallback that calms animations for visitors who prefer less movement.
* The page makes no external requests. Icons are inline SVG, avatars are drawn with CSS, and the hero preview is built from simple page elements, so the page works fully offline.

**Customizing.**

* To change colors, edit the variables in the `:root` block at the top of `styles.css`.
* To change copy and branding, update the text and the `FlowState` wordmark in `index.html`.
* To change pricing, update the `data-monthly` and `data-annual` attributes on each price value in `index.html`, which drive both billing states.

**License.** Provided as is for demonstration and educational purposes. Use it freely.
