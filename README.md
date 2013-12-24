btree-js
========
# B+ Tree in JavaScript
By: Graham O'Neill, April 2013

## Introduction
I'd been planning on writing a B+ Tree implementation ever since I came across them on a
computing course at university. I'm not sure there is a practical use for a JavaScript
version but it does have the advantage that it's easy to present interactively online.
My main objectives for the routine were that it should be:

## Pure JavaScript
I didn't want a version that relied on any additional frameworks, libraries or add-on
files.

## Fast
As a utility function there is no point having it if it isn't reasonably efficient.

## Complete
There are hundreds of "insert only" B-tree solutions, but I wanted mine to have a proper
delete function (as opposed to the more normal "lazy delete") as well as providing
functions that make the tree useable, such as Seek, Seek Near, Skip, Goto, GoTop, GoBottom.

## Understandable
There are solutions that use obscure, complex recursive procedures. Other than displaying
the whole tree, where recursion works well, this isn't a problem that is well suited to
it. In the cases where you do need to move through the tree performing the same process at
different levels (insertion and deletion) you have already identified the path required
when you searched for the appropriate leaf in the beginning. A loop works just as well
without the additional overhead of recursive function calls.

I've written some notes and a detailed insertion/deletion tutorial to explain in more
detail how the functions work.

## Performance
The demo page has an option to find the total time to insert and seek a set number of
random numeric keys. Using this I found the following to be typical speeds with Firefox 20
on my Windows 7, i7-2600 3.4GHz PC:

<table cellspacing="0"> 
    <col width="100"><col width="70"><col width="70"><col width="70">
    <tr><th>INSERT</th><th colspan=3>Tree Order</th></tr>
    <tr><th>No. of keys</th><th>7</th><th>20</th><th>100</th></tr>
    <tr><td>500,000</td><td>533ms</td><td>331ms</td><td>310ms</td></tr>
    <tr><td>1,000,000</td><td>1,236ms</td><td>769ms</td><td>764ms</td></tr>
    <tr><td>2,000,000</td><td>2,872ms</td><td>1,842ms</td><td>1,784ms</td></tr>
    <tr><td>5,000,000</td><td>10,034ms</td><td>5,627ms</td><td>5,279ms</td></tr>
    </table></div>
    <div class="perf"><table cellspacing="0"> 
    <col width="100"><col width="70"><col width="70"><col width="70">
    <tr><th>SEEK</th><th colspan=3>Tree Order</th></tr>
    <tr><th>No. of keys</th><th>7</th><th>20</th><th>100</th></tr>
    <tr><td>500,000</td><td>119ms</td><td>92ms</td><td>120ms</td></tr>
    <tr><td>1,000,000</td><td>245ms</td><td>189ms</td><td>241ms</td></tr>
    <tr><td>2,000,000</td><td>525ms</td><td>392ms</td><td>497ms</td></tr>
    <tr><td>5,000,000</td><td>1,263ms</td><td>948ms</td><td>1,285ms</td></tr>
</table>

I also tested it with 10,000,000 keys and found inserts took about 23 seconds for order 8,
and 12 seconds for order 100, but at that point the browser became unstable. To be honest,
though, if you have that many keys and you're using JavaScript you might want to rethink
your approach!

Although these tests and the other routines on the demo page use only integers for the keys,
this is only because the display of the results is much easier when keys are quite short.
The B+ Tree routines themselves can accept character keys too. Of course, one tree should
always use keys of a single type to ensure you get predictable results when comparing them.

## Limitations

Apart from the limit on the number of keys mentioned above, there are also some other
restrictions:

### Order
The tree must be built with a minimum order of 3 (ie. at least two keys on each leaf and
node). I didn't think this was unreasonable as otherwise it isn't really a B+ tree.

### Duplicate keys
The routines don't allow duplicate keys. If you really need this facility, I would think
the best way to incorporate it would be to change the record pointers on each leaf key
into either an array or a linked list. It would be much easier and more effective than
allowing for duplicates in the actual B tree structure.

### Concurrence
Since JavaScript is a single user, single threaded language I don't need to worry about
concurrence at all.

## Demo
The demo screen shows the tree with each internal node in brown, each leaf in green and
the current key in red. It also displays the status flags End of File (eof) and Found,
which are updated after each operation. It provides the following operations:

### Build new tree
Before you can do anything you have to build a new tree by specifying the order required.
The minimum order is 3.

### Insert
This will add a specified key value to the tree.

### Delete
If a key value is given this will delete that key from the file. If no key is given, the
current key is deleted.

### Seek / Seek Near
The tree is searched for the specified key. If it isn't found, Seek will return Found as
false and eof as true, while Seek Near will return the next highest key value if there is
one.

### Skip
If no count is given then the next key is made the current key. Otherwise the specified
number of keys are skipped over. The count can be positive or negative e.g. Skip(-1) will
jump to the previous key. Skip and Skip(1) are identical.

### Goto
The current key is selected by counting from the beginning of the tree (or from the end of
the file if the parameter is negative).

### Top / Bottom
The first or last key in the tree is set as the current key. Top and Goto(1) are identical,
Bottom and Goto(-1) are identical.

### Pack
Inserting and deleting keys in a tree can mean that there are many nodes that are not
completely full. This process will compress the tree into as few leaves and nodes as possible.

### Hide / Show From box
The demo screen shows how the last operation changed the tree by displaying what the tree was
like before and after that operation. Sometimes it's easier just to see the resulting tree
without using up space seeing the original tree, so these options allow you to toggle the
display.

### Show history
This will display the series of commands you entered to get to the current state. It's
probably more useful in offline mode where you can change the html file as then you can cut
and paste into the Hardcoded script (see below) to recreate the tree again later.

### Run script
The html file has a function called Hardcoded that will run a series of predefined commands.
If you are testing changes, this is useful for recreating the initial test tree.

### Init random pool
An array with the specified number of random keys is created. No change is made to the tree.

### Add random keys
Once the random pool has been created, you can insert a specified number of keys from that
pool into the tree.

### Random key timer
This will create a random pool with the specified number of keys and will then build a new
tree and insert the whole pool into the tree. The total time taken for the build and insertion
is displayed. Although a new tree is built, you must still use the Build New Tree option above
first, as this specifies what tree order you want to use for the test. To avoid browser
timeouts (where the browser will show "Not responding"), timings for up to 2,000,000 keys are
performed in one loop and anything above that is split into groups of 1,000,000 keys.

Note that running this multiple times will show progressively slower times. I think this is
because the browser has to spend time running a garbage collection process to clean up the
previous tree, so the best way of timing is to close the browser and run the html file from
Explorer each time.

Feel free to use this as you wish but please don't claim it to be your own work, and if you
use it in a real application please let me know so I can see it in use. If you find any bugs
you can report them by using the Comments section or the Contact page:

http://goneill.co.nz/btree.php
