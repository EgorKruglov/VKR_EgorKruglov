package org.example.admin;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.order.model.FullOrderDto;
import org.example.order.model.OrderDto;
import org.example.order.model.OrderStatus;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("admin/orders")
@RequiredArgsConstructor
@Slf4j
public class AdminOrderController {
    private final AdminOrderService orderService;

    @GetMapping
    public ResponseEntity<List<FullOrderDto>> getOrdersByPeriod(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        log.info("GET admin запрос на получение заявок пользователей");
        if (start.isAfter(end)) {
            return ResponseEntity.badRequest().build();
        }

        List<FullOrderDto> orders = orderService.getOrders(start.plusHours(3), end.plusHours(3));
        return ResponseEntity.ok(orders);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody Map<String, OrderStatus> request) {
        log.info("PATCH admin запрос на обновление статуса заявки id: {}", id);
        orderService.updateOrderStatus(id, request.get("status"));
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        log.info("DELETE admin запрос на удаление заявки по id: {}", id);
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<OrderDto> updateOrder(
            @PathVariable Long id,
            @Valid @RequestBody OrderDto orderDto) {
        log.info("PUT запрос на обновление данных заявки: {}", orderDto);
        OrderDto updatedOrder = orderService.updateOrder(id, orderDto);
        return ResponseEntity.ok(updatedOrder);
    }
}
