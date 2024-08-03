from flask import Flask, request, render_template, redirect, url_for

app= Flask(__name__)

chores = []

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        chore = request.form['chore']
        chores.append(chore)
    return render_template('index.html', chores=chores)

@app.route('/delete/<int:chore_id>', methods=['POST'])
def delete(chore_id):
    if chore_id < len(chores):
        chores.pop(chore_id)
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)