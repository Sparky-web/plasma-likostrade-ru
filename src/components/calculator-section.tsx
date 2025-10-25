"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Calculator, FileText, Send } from "lucide-react"
import { Badge } from "~/components/ui/badge"

interface CalculationResult {
  baseRate: number
  materialCoeff: number
  urgencyCoeff: number
  complexityCoeff: number
  baseCost: number
  materialCost: number
  urgencyCost: number
  complexityCost: number
  setupFee: number
  minOrderFee: number
  totalCost: number
}

export function CalculatorSection() {
  const [material, setMaterial] = useState("")
  const [thickness, setThickness] = useState("")
  const [length, setLength] = useState("")
  const [urgency, setUrgency] = useState("")
  const [complexity, setComplexity] = useState("")
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const materialRates = {
    steel: { name: "Сталь", baseRate: 120, coeff: 1.0 },
    stainless: { name: "Нержавеющая сталь", baseRate: 120, coeff: 1.35 },
    aluminum: { name: "Алюминий", baseRate: 120, coeff: 1.2 },
  }

  const urgencyRates = {
    standard: { name: "Стандарт (3-5 дней)", coeff: 1.0 },
    urgent: { name: "Срочно (1-2 дня)", coeff: 1.3 },
    express: { name: "Сверхсрочно (в день заказа)", coeff: 1.6 },
  }

  const complexityRates = {
    simple: { name: "Обычная деталь", coeff: 1.0 },
    complex: { name: "Сложная деталь", coeff: 1.15 },
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!material) newErrors.material = "Выберите материал"
    if (!thickness) newErrors.thickness = "Укажите толщину"
    else if (Number.parseFloat(thickness) <= 0 || Number.parseFloat(thickness) > 100) {
      newErrors.thickness = "Толщина должна быть от 0.5 до 100 мм"
    }
    if (!length) newErrors.length = "Укажите длину реза"
    else if (Number.parseFloat(length) <= 0) {
      newErrors.length = "Длина должна быть больше 0"
    }
    if (!urgency) newErrors.urgency = "Выберите срочность"
    if (!complexity) newErrors.complexity = "Выберите сложность"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateCost = () => {
    if (!validateForm()) return

    const materialData = materialRates[material as keyof typeof materialRates]
    const urgencyData = urgencyRates[urgency as keyof typeof urgencyRates]
    const complexityData = complexityRates[complexity as keyof typeof complexityRates]

    const thicknessNum = Number.parseFloat(thickness)
    const lengthNum = Number.parseFloat(length)

    // Базовая стоимость
    const baseRate = materialData.baseRate
    const baseCost = baseRate * lengthNum

    // Применяем коэффициенты
    const materialCost = baseCost * materialData.coeff
    const urgencyCost = materialCost * urgencyData.coeff
    const complexityCost = urgencyCost * complexityData.coeff

    // Дополнительные сборы
    const setupFee = lengthNum < 2 ? 300 : 0
    const minOrderFee = complexityCost < 500 ? 500 - complexityCost : 0

    const totalCost = Math.round(complexityCost + setupFee + minOrderFee)

    const calculationResult: CalculationResult = {
      baseRate,
      materialCoeff: materialData.coeff,
      urgencyCoeff: urgencyData.coeff,
      complexityCoeff: complexityData.coeff,
      baseCost,
      materialCost,
      urgencyCost,
      complexityCost,
      setupFee,
      minOrderFee,
      totalCost,
    }

    setResult(calculationResult)
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Калькулятор стоимости</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Рассчитайте стоимость плазменной резки онлайн. Получите точную оценку за несколько секунд
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Форма калькулятора */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Параметры заказа
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Материал */}
                <div className="space-y-2">
                  <Label htmlFor="material">Материал *</Label>
                  <Select value={material} onValueChange={setMaterial}>
                    <SelectTrigger className={errors.material ? "border-destructive" : ""}>
                      <SelectValue placeholder="Выберите материал" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(materialRates).map(([key, data]) => (
                        <SelectItem key={key} value={key}>
                          {data.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.material && <p className="text-sm text-destructive">{errors.material}</p>}
                </div>

                {/* Толщина */}
                <div className="space-y-2">
                  <Label htmlFor="thickness">Толщина материала (мм) *</Label>
                  <Input
                    id="thickness"
                    type="number"
                    placeholder="Например: 5"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    className={errors.thickness ? "border-destructive" : ""}
                    min="0.5"
                    max="100"
                    step="0.1"
                  />
                  {errors.thickness && <p className="text-sm text-destructive">{errors.thickness}</p>}
                </div>

                {/* Длина реза */}
                <div className="space-y-2">
                  <Label htmlFor="length">Длина реза (м) *</Label>
                  <Input
                    id="length"
                    type="number"
                    placeholder="Например: 12"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className={errors.length ? "border-destructive" : ""}
                    min="0.1"
                    step="0.1"
                  />
                  {errors.length && <p className="text-sm text-destructive">{errors.length}</p>}
                </div>

                {/* Срочность */}
                <div className="space-y-2">
                  <Label htmlFor="urgency">Срочность *</Label>
                  <Select value={urgency} onValueChange={setUrgency}>
                    <SelectTrigger className={errors.urgency ? "border-destructive" : ""}>
                      <SelectValue placeholder="Выберите срочность" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(urgencyRates).map(([key, data]) => (
                        <SelectItem key={key} value={key}>
                          {data.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.urgency && <p className="text-sm text-destructive">{errors.urgency}</p>}
                </div>

                {/* Сложность */}
                <div className="space-y-2">
                  <Label htmlFor="complexity">Сложность детали *</Label>
                  <Select value={complexity} onValueChange={setComplexity}>
                    <SelectTrigger className={errors.complexity ? "border-destructive" : ""}>
                      <SelectValue placeholder="Выберите сложность" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(complexityRates).map(([key, data]) => (
                        <SelectItem key={key} value={key}>
                          {data.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.complexity && <p className="text-sm text-destructive">{errors.complexity}</p>}
                </div>

                <Button onClick={calculateCost} className="w-full" size="lg">
                  <Calculator className="h-4 w-4 mr-2" />
                  Рассчитать стоимость
                </Button>
              </CardContent>
            </Card>

            {/* Результат расчета */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Результат расчета
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6">
                    {/* Итоговая стоимость */}
                    <div className="text-center p-6 bg-accent/10 rounded-lg">
                      <div className="text-3xl font-bold text-accent mb-2">{result.totalCost.toLocaleString()} ₽</div>
                      <div className="text-sm text-muted-foreground">Итоговая стоимость</div>
                    </div>

                    {/* Детализация расчета */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Детализация расчета:</h4>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>
                            Базовая ставка ({result.baseRate} ₽/м × {length} м):
                          </span>
                          <span>{Math.round(result.baseCost).toLocaleString()} ₽</span>
                        </div>

                        {result.materialCoeff !== 1 && (
                          <div className="flex justify-between text-muted-foreground">
                            <span>Коэффициент материала (×{result.materialCoeff}):</span>
                            <span>{Math.round(result.materialCost).toLocaleString()} ₽</span>
                          </div>
                        )}

                        {result.urgencyCoeff !== 1 && (
                          <div className="flex justify-between text-muted-foreground">
                            <span>Коэффициент срочности (×{result.urgencyCoeff}):</span>
                            <span>{Math.round(result.urgencyCost).toLocaleString()} ₽</span>
                          </div>
                        )}

                        {result.complexityCoeff !== 1 && (
                          <div className="flex justify-between text-muted-foreground">
                            <span>Коэффициент сложности (×{result.complexityCoeff}):</span>
                            <span>{Math.round(result.complexityCost).toLocaleString()} ₽</span>
                          </div>
                        )}

                        {result.setupFee > 0 && (
                          <div className="flex justify-between text-muted-foreground">
                            <span>Сбор за установку (длина {"<"} 2м):</span>
                            <span>{result.setupFee.toLocaleString()} ₽</span>
                          </div>
                        )}

                        {result.minOrderFee > 0 && (
                          <div className="flex justify-between text-muted-foreground">
                            <span>Минимальная стоимость заказа:</span>
                            <span>{result.minOrderFee.toLocaleString()} ₽</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Дополнительная информация */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Точность ±0.1мм</Badge>
                        <Badge variant="secondary">Гарантия качества</Badge>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        * Окончательная стоимость может отличаться в зависимости от сложности чертежа и дополнительных
                        требований
                      </p>
                    </div>

                    {/* Кнопки действий */}
                    <div className="space-y-3">
                      <Button className="w-full" size="lg">
                        <Send className="h-4 w-4 mr-2" />
                        Отправить заявку на расчет
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        <FileText className="h-4 w-4 mr-2" />
                        Скачать расчет в PDF
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Заполните параметры заказа для получения расчета стоимости</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
