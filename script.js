class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    pop() {
        if (this.isEmpty()) {
            return null;
        }

        const root = this.heap[0];
        const last = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.heapifyDown();
        }

        return root;
    }

    heapifyUp() {
        let index = this.heap.length - 1;

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);

            if (this.heap[index] < this.heap[parentIndex]) {
                this.swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    heapifyDown() {
        let index = 0;

        while (true) {
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            let smallest = index;

            if (leftChild < this.heap.length && this.heap[leftChild] < this.heap[smallest]) {
                smallest = leftChild;
            }

            if (rightChild < this.heap.length && this.heap[rightChild] < this.heap[smallest]) {
                smallest = rightChild;
            }

            if (smallest !== index) {
                this.swap(index, smallest);
                index = smallest;
            } else {
                break;
            }
        }
    }

    swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

function mincost(arr) {
    if (!Array.isArray(arr) || arr.length < 2) {
        return "Invalid input. Please provide an array with at least two elements.";
    }

    const minHeap = new MinHeap();

    // Insert all ropes into the min-heap
    arr.forEach(rope => minHeap.push(rope));

    let totalCost = 0;

    // Connect ropes until only one remains
    while (minHeap.heap.length > 1) {
        const firstRope = minHeap.pop();
        const secondRope = minHeap.pop();

        const cost = firstRope + secondRope;
        totalCost += cost;

        minHeap.push(cost);
    }

    return totalCost;
}