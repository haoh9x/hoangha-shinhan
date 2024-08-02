"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const formSchema = z.object({
  product: z.enum(["apple", "nonapple"], {
    required_error: "Bạn cần chọn sản phẩm Apple hoặc Non Apple",
  }),
  price: z.string().min(6, {
    message: "Giá máy tối thiểu 3.000.000đ",
  }),
  percent: z.enum(
    ["0", "5", "10", "15", "20", "25", "30", "35", "40", "45", "50"],
    {
      required_error: "Bạn cần chọn số tháng góp",
    }
  ),
  month: z.enum(["3", "6", "9", "12"], {
    required_error: "Bạn cần chọn số tháng góp",
  }),
});

export default function Home() {
  const [product, setProduct] = useState("apple");
  const [price, setPrice] = useState(0);
  const [month, setMonth] = useState("6");
  const [arrMonth, setArrMonth] = useState(["6"]);
  const [percent, setPercent] = useState(0);
  const [interestHH, setInterestHH] = useState(0);
  const [interestSH, setInterestSH] = useState(0);
  const [arrPercent, setArrPercent] = useState([
    "0",
    "5",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
  ]);

  function formatCurrency(price: number) {
    var DecimalSeparator = Number("1.2").toLocaleString().substr(1, 1);
    var priceWithCommas = price.toLocaleString();
    var arParts = String(priceWithCommas).split(DecimalSeparator);
    var intPart = arParts[0];
    var decPart = arParts.length > 1 ? arParts[1] : "";
    return intPart + decPart;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: "apple",
      price: "3000000",
    },
  });

  const onValueChange = () => {
    if (product === "apple") {
      setArrMonth(["6", "9", "12"]);
      setArrPercent([
        "0",
        "5",
        "10",
        "15",
        "20",
        "25",
        "30",
        "35",
        "40",
        "45",
        "50",
      ]);
      if (price >= 3000000 && price <= 50000000) {
        if (percent >= 0 && percent <= 30) {
          if (month === "6") {
            setInterestHH(4.5);
            setInterestSH(0);
          } else if (month === "9") {
            setInterestHH(6.5);
          } else if (month === "12") {
            setInterestHH(8);
            setInterestSH(0);
          }
        } else if (percent > 30 && percent <= 50) {
          if (month === "6") {
            setInterestHH(3.5);
            setInterestSH(0);
          } else if (month === "9") {
            setInterestHH(5);
          } else if (month === "12") {
            setInterestHH(7);
            setInterestSH(0);
          }
        }
      }
    } else if (product === "nonapple") {
      if (price >= 3000000 && price < 15000000) {
        setArrPercent([
          "0",
          "5",
          "10",
          "15",
          "20",
          "25",
          "30",
          "35",
          "40",
          "45",
          "50",
        ]);
        if (percent === 0) {
          setArrMonth(["6"]);
          if (month === "6") {
            setInterestHH(5.9);
            setInterestSH(0);
          }
        } else if (percent > 0) {
          setArrMonth(["9", "12"]);
          setInterestSH(1);
        }
      } else if (price > 15000000) {
        setArrPercent(["20", "25", "30", "35", "40", "45", "50"]);
        if (percent >= 20 && percent < 30) {
          setArrMonth(["6", "9"]);
          setInterestSH(1);
          if (month === "6") {
            setInterestHH(2);
          } else if (month === "9") {
            setInterestHH(3);
          }
        } else if (percent >= 30 && percent <= 50) {
          setArrMonth(["3", "6", "9"]);
          setInterestSH(0);
          if (month === "3") {
            setInterestHH(4.3);
          } else if (month === "6") {
            setInterestHH(5);
          } else if (month === "9") {
            setInterestHH(6.5);
          }
        }
      }
    }
  };

  useEffect(() => {
    onValueChange();
  }, [price, percent, month, product]);

  function onSubmit(values: z.infer<typeof formSchema>) {}
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="product"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Sản phẩm</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(e) => {
                      setProduct(e);
                    }}
                    defaultValue={field.value}
                    className="flex space-x-3"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="apple" />
                      </FormControl>
                      <FormLabel className="font-normal">Apple</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="nonapple" />
                      </FormControl>
                      <FormLabel className="font-normal">Non Apple</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Giá sản phẩm (VNĐ)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="3.000.000đ"
                    type="number"
                    min={3000000}
                    {...fieldProps}
                    onChange={(event) => {
                      setPrice(parseInt(event.target.value));
                    }}
                  />
                </FormControl>
                <FormDescription>{formatCurrency(price)}đ</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="percent"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Đưa trước</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(e) => {
                      setPercent(parseInt(e));
                      onValueChange();
                    }}
                    defaultValue={percent.toString()}
                    className="flex space-x-3"
                  >
                    {arrPercent.map((value) => {
                      return (
                        <FormItem
                          key={value}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {value} %
                          </FormLabel>
                        </FormItem>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Số tháng góp</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(e) => {
                      setMonth(e);
                    }}
                    defaultValue={month}
                    className="flex flex-col space-y-1"
                  >
                    {arrMonth.map((value) => {
                      return (
                        <FormItem
                          key={value}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {value} tháng
                          </FormLabel>
                        </FormItem>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            Số tiền đưa trước: {formatCurrency((price * percent) / 100)}đ
          </div>
          <div>
            Phí Hoàng Hà thu: {interestHH}%,{" "}
            {formatCurrency((price * interestHH) / 100)}đ
          </div>
          <div>
            Số tiền góp mỗi tháng:{" "}
            {formatCurrency(
              (price - (price * percent) / 100) / parseInt(month)
            )}
            đ
          </div>
          <div>
            Số tiền chênh lệch: {interestSH}% ={" "}
            {formatCurrency(price * (interestSH / 100))}đ
          </div>
        </form>
      </Form>
    </main>
  );
}
