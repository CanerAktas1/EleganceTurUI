const phrases = [
    "Nereye gitmek istersiniz?",
    "Amerika?",
    "Paris?",
    "Yunanistan?"
];

let input = document.getElementById("search-input");
let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;

function typeEffect() {
    const fullText = phrases[currentPhrase];
    let updatedText = fullText.substring(0, currentChar);

    input.setAttribute("placeholder", updatedText);

    if (!isDeleting) {
        if (currentChar < fullText.length) {
            currentChar++;
            setTimeout(typeEffect, 100);
        } else {
            isDeleting = true;
            setTimeout(typeEffect, 1000);
        }
    } else {
        if (currentChar > 0) {
            currentChar--;
            setTimeout(typeEffect, 50);
        } else {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            setTimeout(typeEffect, 500);
        }
    }

}


typeEffect();



// ! IMAGE GALLERY START
document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const items = document.querySelectorAll('.carousel-item');
    const itemWidth = items[0].offsetWidth + 20;
    const visibleItems = 4;

    let position = 0;
    const maxPosition = items.length - visibleItems;

    nextBtn.addEventListener('click', () => {
        if (position < maxPosition) {
            position++;
            updateTrack();
        }
    });
    // buttons click events
    prevBtn.addEventListener('click', () => {
        if (position > 0) {
            position--;
            updateTrack();
        }
    });
    // image movement animation
    function updateTrack() {
        track.style.transform = `translateX(-${position * itemWidth}px)`;
    }

    // responsive section
    window.addEventListener('resize', () => {
        updateTrack();
    });

});



// function bubbleSort(arr) {
//     let n = arr.length;

//     for (let i = 0; i < n - 1; i++) {
//         for (let j = 0; j < n - i - 1; j++) {
//             if (arr[j] > arr[j + 1]) {
//                 let temp = arr[j];
//                 arr[j] = arr[j + 1];
//                 arr[j + 1] = temp;
//             }
//         }
//     }
//     return arr;
// }



// let array = [64, 34, 25, 12, 22, 11, 90];
// console.log("Original array:", array);
// console.log("Sorted array:", bubbleSort(array));


// // ! IMAGE GALLERY END



// // ! BINARY SEARCH TREE
// class Node {
//     constructor(value) {
//         this.value = value;
//         this.left = null;
//         this.right = null;
//     }
// }

// class BinaryNode {

//     constructor() {
//         let inputBox = document.createElement("input")
//         inputBox.setAttribute("type", "text");
//         let userPrompt = inputBox.value;

//     }
// }

// class BinarySearchTree {
//     constructor() {
//         this.root = null;
//     }

//     insert(value) {
//         const newNode = new Node(value);

//         if (this.root === null) {
//             this.root = newNode;
//             return this;
//         }

//         let current = this.root;

//         while (true) {
//             if (value === current.value) return undefined;
//             if (value < current.value) {
//                 if (current.left === null) {
//                     current.left = newNode;
//                     return this;
//                 }
//                 current = current.left;
//             } else {
//                 if (current.right === null) {
//                     current.right = newNode;
//                     return this;
//                 }
//                 current = current.right;
//             }
//         }
//     }

//     search(value) {
//         if (!this.root) return false;

//         let current = this.root;
//         while (current) {
//             if (value === current.value) return true;
//             if (value < current.value) {
//                 current = current.left;
//             } else {
//                 current = current.right;
//             }
//         }
//         return false;
//     }

//     inOrderTraversal() {
//         const result = [];

//         function traverse(node) {
//             if (node.left) traverse(node.left);
//             result.push(node.value);
//             if (node.right) traverse(node.right);
//         }

//         if (this.root) traverse(this.root);
//         return result;
//     }
// }

// const bst = new BinarySearchTree();
// bst.insert(10);
// bst.insert(5);
// bst.insert(15);
// bst.insert(3);
// bst.insert(7);

// console.log("BST In-order traversal:", bst.inOrderTraversal());
// console.log("Search for 7:", bst.search(7));
// console.log("Search for 9:", bst.search(9));


