/**
 *
 */
function genMDStrForPost() {
  console.log(
    ['a', 'b', 'c', '...', 'y', 'z', 'aa', '...', 'zz']
      .map(
        (s) =>
          '  - ' +
          (s.toLowerCase().charCodeAt(0) >= 64
            ? `${s.toUpperCase()}<sub>26</sub> = ${s}<sub>26</sub> = ${base26ABCto10(s)}<sub>10</sub>`
            : s)
      )
      .join('\n')
  );
}

/**
 *
 */
function genFirs250ColumnNumbers() {
  console.log(
    [...Array(251).keys()]
      .slice(1)
      .map((n) => `  - ${base26ABCfrom10(n)} = ${n}`)
      .join('\n')
  );
}
