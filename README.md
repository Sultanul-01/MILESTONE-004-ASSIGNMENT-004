# MILESTONE-004-ASSIGNMENT-004

Answers to Questions

1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
2. How do you create and insert a new element into the DOM?
3. What is Event Bubbling? And how does it work?
4. What is Event Delegation in JavaScript? Why is it useful?
5. What is the difference between preventDefault() and stopPropagation() methods?

# 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

# Answer to the question no 1:

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

# 2. How do you create and insert a new element into the DOM?

# Answer to the question no 2:

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

# 3. What is Event Bubbling? And how does it work?

# Answer to the question no 3:

Event Bubbling is a mechanism in JavaScript where an event starts from the target element (the element that was clicked) and then propagates upward through its parent elements in the DOM tree.

How Does It Work?

i.When an event (like click) happens:

ii.The event first runs on the target element.

iii.Then it moves to its parent element.

iv.Then to the grandparent.

v.Continues until it reaches the document.

# What is Event Delegation in JavaScript? Why is it useful?

# Answer to the question no 4:

Event Delegation is attaching a single event listener to a parent element to handle events for its child elements.

Why it is useful:

i.Improves performance

ii.Works for dynamically added elements

iii.Cleaner and more maintainable code

# 5. What is the difference between preventDefault() and stopPropagation() methods?

# Answer to the question no 4:

preventDefault() → Stops browser action

stopPropagation() → Stops event movement (bubbling)
