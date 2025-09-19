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

// ! COUPON PAGE FUNCTIONALITY START
function copyToClipboard(text, button) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function () {
            showCopySuccess(button);
        }).catch(function (err) {
            console.error('Kopyalama başarısız oldu: ', err);
            fallbackCopyTextToClipboard(text, button);
        });
    } else {
        fallbackCopyTextToClipboard(text, button);
    }
}

function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(button);
        } else {
            console.error('Kopyalama başarısız oldu');
        }
    } catch (err) {
        console.error('Kopyalama desteklenmiyor: ', err);
    }

    document.body.removeChild(textArea);
}

function showCopySuccess(button) {
    const originalText = button.innerHTML;
    const originalClasses = button.className;

    // Buton metnini ve ikonunu değiştir
    button.innerHTML = '<i class="fas fa-check"></i> Kopyalandı!';
    button.classList.add('coupon-copy-success');

    // 3 saniye sonra eski haline dön
    setTimeout(function () {
        button.innerHTML = originalText;
        button.className = originalClasses;
    }, 3000);
}
// ! COUPON PAGE FUNCTIONALITY END



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


function twoSum(nums, target) {
    let map = {};
    for (let i = 0; i < nums.length; i++) {
        if (map[target - nums[i]] !== undefined) return [map[target - nums[i]], i];
        map[nums[i]] = i;
    }
}

function reverseList(head) {
    let prev = null;
    while (head) {
        let next = head.next;
        head.next = prev;
        prev = head;
        head = next;
    }
    return prev;
}

function mergeTwoLists(l1, l2) {
    let dummy = { val: 0, next: null };
    let cur = dummy;
    while (l1 && l2) {
        if (l1.val < l2.val) {
            cur.next = l1;
            l1 = l1.next;
        } else {
            cur.next = l2;
            l2 = l2.next;
        }
        cur = cur.next;
    }
    cur.next = l1 || l2;
    return dummy.next;
}

function isValid(s) {
    let stack = [];
    let map = { ")": "(", "]": "[", "}": "{" };
    for (let c of s) {
        if (map[c]) {
            if (!stack.length || stack.pop() !== map[c]) return false;
        } else {
            stack.push(c);
        }
    }
    return !stack.length;
}

function binarySearch(nums, target) {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        let mid = (l + r) >> 1;
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}

function maxSubArray(nums) {
    let cur = nums[0], best = nums[0];
    for (let i = 1; i < nums.length; i++) {
        cur = Math.max(nums[i], cur + nums[i]);
        best = Math.max(best, cur);
    }
    return best;
}

function floodFill(img, sr, sc, newColor) {
    let orig = img[sr][sc];
    if (orig === newColor) return img;
    let q = [[sr, sc]];
    let R = img.length, C = img[0].length;
    while (q.length) {
        let [r, c] = q.shift();
        if (img[r][c] === orig) {
            img[r][c] = newColor;
            if (r > 0) q.push([r - 1, c]);
            if (r + 1 < R) q.push([r + 1, c]);
            if (c > 0) q.push([r, c - 1]);
            if (c + 1 < C) q.push([r, c + 1]);
        }
    }
    return img;
}

function climbStairs(n) {
    let a = 1, b = 1;
    for (let i = 0; i < n; i++) {
        [a, b] = [b, a + b];
    }
    return a;
}

function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) return root;
    let l = lowestCommonAncestor(root.left, p, q);
    let r = lowestCommonAncestor(root.right, p, q);
    if (l && r) return root;
    return l || r;
}

function levelOrder(root) {
    if (!root) return [];
    let res = [];
    let q = [root];
    while (q.length) {
        let n = q.length, lev = [];
        for (let i = 0; i < n; i++) {
            let node = q.shift();
            lev.push(node.val);
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
        res.push(lev);
    }
    return res;
}

function quickSelect(nums, k) {
    function partition(l, r, p) {
        let pivot = nums[p];
        [nums[p], nums[r]] = [nums[r], nums[p]];
        let i = l;
        for (let j = l; j < r; j++) {
            if (nums[j] < pivot) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++;
            }
        }
        [nums[i], nums[r]] = [nums[r], nums[i]];
        return i;
    }
    let l = 0, r = nums.length - 1;
    while (true) {
        let p = partition(l, r, Math.floor((l + r) / 2));
        if (p === k) return nums[p];
        if (p < k) l = p + 1;
        else r = p - 1;
    }
}

function topKFrequent(nums, k) {
    let map = new Map();
    for (let n of nums) map.set(n, (map.get(n) || 0) + 1);
    let arr = Array.from(map.entries());
    arr.sort((a, b) => b[1] - a[1]);
    return arr.slice(0, k).map(x => x[0]);
}

function lengthOfLongestSubstring(s) {
    let set = new Set()
    let l = 0, best = 0
    for (let r = 0; r < s.length; r++) {
        while (set.has(s[r])) { set.delete(s[l]); l++ }
        set.add(s[r])
        best = Math.max(best, r - l + 1)
    }
    return best
}

function longestPalindrome(s) {
    if (s.length < 2) return s
    let start = 0, end = 0
    function expand(l, r) {
        while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++ }
        return [l + 1, r - 1]
    }
    for (let i = 0; i < s.length; i++) {
        let [l1, r1] = expand(i, i)
        let [l2, r2] = expand(i, i + 1)
        if (r1 - l1 > end - start) { start = l1; end = r1 }
        if (r2 - l2 > end - start) { start = l2; end = r2 }
    }
    return s.slice(start, end + 1)
}

function minWindow(s, t) {
    if (!t.length) return ""
    let need = new Map()
    for (let c of t) need.set(c, (need.get(c) || 0) + 1)
    let have = 0, needCount = need.size
    let l = 0, res = [-1, -1], resLen = Infinity
    let window = new Map()
    for (let r = 0; r < s.length; r++) {
        let c = s[r]
        window.set(c, (window.get(c) || 0) + 1)
        if (need.has(c) && window.get(c) === need.get(c)) have++
        while (have === needCount) {
            if (r - l + 1 < resLen) { res = [l, r]; resLen = r - l + 1 }
            let d = s[l]
            window.set(d, window.get(d) - 1)
            if (need.has(d) && window.get(d) < need.get(d)) have--
            l++
        }
    }
    return resLen === Infinity ? "" : s.slice(res[0], res[1] + 1)
}

function mergeIntervals(intervals) {
    intervals.sort((a, b) => a[0] - b[0])
    let res = []
    for (let int of intervals) {
        if (!res.length || res[res.length - 1][1] < int[0]) res.push(int.slice())
        else res[res.length - 1][1] = Math.max(res[res.length - 1][1], int[1])
    }
    return res
}

function searchMatrix(matrix, target) {
    let r = 0, c = matrix[0].length - 1
    while (r < matrix.length && c >= 0) {
        if (matrix[r][c] === target) return true
        if (matrix[r][c] > target) c--
        else r++
    }
    return false
}

function productExceptSelf(nums) {
    let n = nums.length
    let res = Array(n).fill(1)
    let pref = 1
    for (let i = 0; i < n; i++) { res[i] = pref; pref *= nums[i] }
    let suff = 1
    for (let i = n - 1; i >= 0; i--) { res[i] *= suff; suff *= nums[i] }
    return res
}

function coinChange(coins, amount) {
    let dp = Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for (let a = 1; a <= amount; a++) {
        for (let c of coins) if (a - c >= 0) dp[a] = Math.min(dp[a], dp[a - c] + 1)
    }
    return dp[amount] === Infinity ? -1 : dp[amount]
}

function wordBreak(s, wordDict) {
    let set = new Set(wordDict)
    let dp = Array(s.length + 1).fill(false)
    dp[0] = true
    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && set.has(s.slice(j, i))) { dp[i] = true; break }
        }
    }
    return dp[s.length]
}

function numIslands(grid) {
    let R = grid.length, C = grid[0].length, count = 0
    function dfs(r, c) {
        if (r < 0 || c < 0 || r >= R || c >= C || grid[r][c] !== '1') return
        grid[r][c] = '0'
        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)
    }
    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
            if (grid[r][c] === '1') { count++; dfs(r, c) }
        }
    }
    return count
}

function canFinish(numCourses, prerequisites) {
    let g = Array.from({ length: numCourses }, () => [])
    let indeg = Array(numCourses).fill(0)
    for (let [a, b] of prerequisites) { g[b].push(a); indeg[a]++ }
    let q = []
    for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) q.push(i)
    let taken = 0
    while (q.length) {
        let u = q.shift()
        taken++
        for (let v of g[u]) {
            indeg[v]--
            if (indeg[v] === 0) q.push(v)
        }
    }
    return taken === numCourses
}

function findMedianSortedArrays(a, b) {
  if (a.length > b.length) return findMedianSortedArrays(b, a)
  let m = a.length, n = b.length, totalLeft = Math.floor((m + n + 1) / 2)
  let lo = 0, hi = m
  while (lo <= hi) {
    let i = (lo + hi) >> 1
    let j = totalLeft - i
    let aL = i === 0 ? -Infinity : a[i - 1]
    let aR = i === m ? Infinity : a[i]
    let bL = j === 0 ? -Infinity : b[j - 1]
    let bR = j === n ? Infinity : b[j]
    if (aL <= bR && bL <= aR) {
      if (((m + n) & 1) === 1) return Math.max(aL, bL)
      return (Math.max(aL, bL) + Math.min(aR, bR)) / 2
    } else if (aL > bR) hi = i - 1
    else lo = i + 1
  }
}

function isMatch(s, p) {
  let m = s.length, n = p.length
  let dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false))
  dp[0][0] = true
  for (let j = 2; j <= n; j++) if (p[j - 1] === '*') dp[0][j] = dp[0][j - 2]
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === '.' || p[j - 1] === s[i - 1]) dp[i][j] = dp[i - 1][j - 1]
      else if (p[j - 1] === '*') {
        dp[i][j] = dp[i][j - 2]
        if (p[j - 2] === '.' || p[j - 2] === s[i - 1]) dp[i][j] = dp[i][j] || dp[i - 1][j]
      }
    }
  }
  return dp[m][n]
}

function solveNQueens(n) {
  let res = []
  let cols = new Set(), d1 = new Set(), d2 = new Set()
  let board = Array.from({ length: n }, () => Array(n).fill('.'))
  function backtrack(r) {
    if (r === n) {
      res.push(board.map(row => row.join('')))
      return
    }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || d1.has(r - c) || d2.has(r + c)) continue
      cols.add(c); d1.add(r - c); d2.add(r + c)
      board[r][c] = 'Q'
      backtrack(r + 1)
      board[r][c] = '.'
      cols.delete(c); d1.delete(r - c); d2.delete(r + c)
    }
  }
  backtrack(0)
  return res
}
