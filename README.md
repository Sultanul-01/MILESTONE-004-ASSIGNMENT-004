# MILESTONE-004-ASSIGNMENT-004

Answers to Questions

1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
2. How do you create and insert a new element into the DOM?
3. What is Event Bubbling? And how does it work?
4. What is Event Delegation in JavaScript? Why is it useful?
5. What is the difference between preventDefault() and stopPropagation() methods?

# Answer to the question no 1

i.getElementById()

Selects one element by its unique id.

Returns a single element object.

Fastest method.

ii.getElementsByClassName()

Selects elements by class name.

Returns a live HTMLCollection (updates automatically if DOM changes).

iii.querySelector()

Selects the first matching element using CSS selector syntax.

Returns a single element.

iv.querySelectorAll()

Selects all matching elements using CSS selectors.

Returns a static NodeList (does NOT auto-update).

# Answer to the question no 2

Step 1: Create element
[const newDiv = document.createElement("div");]
Step 2: Add content
[newDiv.textContent = "Sultanul Alam";]
Step 3: Insert into DOM
[document.body.appendChild(newDiv);]

Other insertion methods:

i.append()

ii.prepend()

iii.before()

iv.after()

Example:

[const parent = document.getElementById("container");
parent.append(newDiv);]
