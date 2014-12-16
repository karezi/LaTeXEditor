function tr(s) {
    return WinJS.Resources.getString(s).value;
}
var latexDemo = [
    { key: 1, s: "\\\\\\triangledown \\cdot D=\\rho \\\\\\triangledown \\cdot B = 0 \\\\\\triangledown \\times E = -\\frac{\\partial B}{\\partial t}\\\\\\triangledown\\times H=J + \\frac{\\partial D}{\\partial t}", name: tr("The Maxwell's Equations"), discription: tr("demo1") },
    { key: 2, s: "e^{i\\pi}+1=0", name: tr("Euler's Identity"), discription: tr("demo2") },
    { key: 3, s: "F=ma", name: tr("Newton's Second Law of Motion"), discription: tr("demo3") },
    { key: 4, s: "a^2+b^2=c^2", name: tr("Pythagorean Theorem"), discription: tr("demo4") },
    { key: 5, s: "E=mc^2", name: tr("Mass–energy Equivalence"), discription: tr("demo5") },
    { key: 6, s: "i\\hbar\\frac{\\partial }{\\partial t}\\Psi (r, t)=\\hat{H}\\Psi(r, t)", name: tr("The Schrödinger Equation"), discription: tr("demo6") },
    { key: 7, s: "1+1=2", name: tr("1+1=2"), discription: tr("demo7") },
    { key: 8, s: "\\\\p=\\hbar k\\\\E=\\hbar \\omega ", name: tr("The de Broglie Relations"), discription: tr("demo8") },
    { key: 9, s: "\\hat f(\\xi ) :=\\int^{\\infty}_{-{\\infty}}f(x)e^{-2\\pi ix\\xi }dx", name: tr("The Fourier Transform"), discription: tr("demo9") },
    { key: 10, s: "c=2\\pi r", name: tr("The Length of the Circumference of a Circle"), discription: tr("demo10") }
];
